const PORT = 8000
const express = require('express')
const {MongoClient, ObjectId} = require('mongodb')
const {v4: uuidv4} = require('uuid')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bcrypt = require('bcrypt')
require('dotenv').config()

const uri = process.env.URI

const app = express()
app.use(cors())
app.use(express.json())

// Default
app.get('/', (req, res) => {
    res.json('Hello to my app')
})

// Sign up to the Database
app.post('/signup', async (req, res) => {
    const client = new MongoClient(uri)
    const {email, password} = req.body

    const generatedUserId = uuidv4()
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const existingUser = await users.findOne({email})

        if (existingUser) {
            return res.status(409).send('User already exists. Please login')
        }

        const sanitizedEmail = email.toLowerCase()

        const data = {
            user_id: generatedUserId,
            email: sanitizedEmail,
            hashed_password: hashedPassword
        }

        const insertedUser = await users.insertOne(data)

        const token = jwt.sign(insertedUser, sanitizedEmail, {
            expiresIn: 60 * 24
        })
        res.status(201).json({token, userId: generatedUserId})

    } catch (err) {
        console.log(err)
    } finally {
        await client.close()
    }
})

//Log in to Database
app.post('/login', async (req, res) => {
    const client = new MongoClient(uri)
    const { email, password } = req.body
  
    try {
      await client.connect()
      const database = client.db('app-data')
      const users = database.collection('users')
  
      const user = await users.findOne({ email })
  
      const correctPassword = await bcrypt.compare(password, user.hashed_password)
  
      if (user && correctPassword) {
        const token = jwt.sign(user, email, {
          expiresIn: 60 * 24
        })
        res.status(201).json({ token, userId: user.user_id })
      } else {
        res.status(400).send('Invalid Credentials')
      }
  
    } catch (err) {
      console.log(err)
    }
})

//Get individual user
app.get('/user', async (req, res) => {
    const client = new MongoClient(uri)
    const userId = req.query.userId
    
    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')
        const query = {user_id: userId}
        const user = await users.findOne(query)
        res.send(user)
    } finally {
        await client.close()
    }
})

app.get('/users', async (req, res) => {
    const client = new MongoClient(uri)
    const userIds = JSON.parse(req.query.userIds)

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const pipeline = 
            [
                {
                    '$match': {
                        'user_id': {
                            '$in': userIds
                        }
                    }
                }
            ]

        const foundUsers = await users.aggregate(pipeline).toArray()
        res.send(foundUsers)

    } finally {
        await client.close()
    }
})

// app.get('/mutual-gender-matches', async (req, res) => {
//     const client = new MongoClient(uri);
//     const userGender = req.query.gender;
//     const userGenderInterest = req.query.genderInterest;

//     try {
//         await client.connect();
//         const database = client.db('app-data');
//         const users = database.collection('users');

//         const genderInterestQuery = {
//             men: userGenderInterest.men && userGender === 'man',
//             women: userGenderInterest.women && userGender === 'woman',
//             nonBinary: userGenderInterest.nonBinary && userGender === 'nonBinary',
//         };

//         const query = {
//             gender_identity: { $ne: userGender }, // Exclude matches with undesired gender identity
//             $or: [
//                 { 'gender_interest.men': genderInterestQuery.men },
//                 { 'gender_interest.women': genderInterestQuery.women },
//                 { 'gender_interest.nonBinary': genderInterestQuery.nonBinary },
//             ]
//         };

//         const foundUsers = await users.find(query).toArray();
//         res.send(foundUsers);
//     } finally {
//         await client.close();
//     }
// });


// app.get('/mutual-gender-matches', async (req, res) => {
//     const client = new MongoClient(uri);
//     // const gender = req.query.gender;
//     const userGender = req.query.gender;
//     const userGenderInterest = req.query.genderInterest
//     // const userId = req.query.userId;

//     try {
//         await client.connect();
//         const database = client.db('app-data');
//         const users = database.collection('users');

//         const genderInterestQuery = []

//         if (userGenderInterest.men && userGender === 'man') {
//             genderInterestQuery.push({gender_interest: {men: true}})
//         }
//         if (userGenderInterest.women && userGender === 'woman') {
//             genderInterestQuery.push({gender_interest: {women: true}})
//         }
//         if (userGenderInterest.nonBinary && userGender === 'nonBinary') {
//             genderInterestQuery.push({gender_interest: {nonBinary: true}})
//         }

//         const query = {
//             $and: [
//                 {gender_identity: {$ne: userGender}},
//                 ...(genderInterestQuery.length > 0 ? [{$or: genderInterestQuery}] : [])
//             ]
//             // gender_interest: {
//             //     men: userGender === 'man',
//             //     women: userGender === 'woman',
//             //     nonBinary: userGender === 'nonBinary'
//             // }
//             // gender_interest: { $eq: gender }
//         }

//         const foundUsers = await users.find(query).toArray()
//         res.send(foundUsers)

//         // // Fetch current user's data
//         // const currentUser = await users.findOne({ user_id: userId });
//         // const currentUserGenderIdentity = currentUser.gender_identity;
//         // const currentUserGenderInterest = currentUser.gender_interest;

//         // // Fetch potential matches based on gender identity
//         // const potentialMatches = await users.find({ gender_identity: currentUserGenderInterest }).toArray();

//         // // Filter matches based on gender interest
//         // const mutualMatches = potentialMatches.filter((match) => {
//         //     const matchGenderInterest = match.gender_interest;
//         //     return matchGenderInterest[currentUserGenderIdentity];
//         // });

//         // res.send(mutualMatches);
//     } finally {
//         await client.close();
//     }
// });


// app.get('/gendered-users', async (req, res) => {
//     const client = new MongoClient(uri)
//     const gender = req.query.gender

//     try {
//         await client.connect()
//         const database = client.db('app-data')
//         const users = database.collection('users')
//         const query = {gender_identity: {$eq : gender}}
//         const foundUsers = await users.find(query).toArray()
//         res.send(foundUsers)

//     } finally {
//         await client.close()
//     }
// })

app.get('/mutual-gender-matches', async (req, res) => {
    const client = new MongoClient(uri);
    const userGender = req.query.gender;
    const userGenderInterest = req.query.genderInterest.split(',');

    try {
        await client.connect();
        const database = client.db('app-data');
        const users = database.collection('users');

        const genderInterestQuery = [];

        for (const interest of userGenderInterest) {
            if (userGender === 'man' && interest === 'men') {
                genderInterestQuery.push({ 'gender_identity': 'man', 'gender_interest.men': true });
            }
            if (userGender === 'man' && interest === 'women') {
                genderInterestQuery.push({ 'gender_identity': 'woman', 'gender_interest.men': true });
            }
            if (userGender === 'man' && interest === 'man') {
                genderInterestQuery.push({ 'gender_identity': 'nonBinary', 'gender_interest.men': true });
            }

            if (userGender === 'woman' && interest === 'men') {
                genderInterestQuery.push({ 'gender_identity': 'man', 'gender_interest.women': true });
            }
            if (userGender === 'woman' && interest === 'women') {
                genderInterestQuery.push({ 'gender_identity': 'woman', 'gender_interest.women': true });
            }
            if (userGender === 'woman' && interest === 'man') {
                genderInterestQuery.push({ 'gender_identity': 'nonBinary', 'gender_interest.women': true });
            }

            if (userGender === 'nonBinary' && interest === 'men') {
                genderInterestQuery.push({ 'gender_identity': 'man', 'gender_interest.nonBinary': true });
            }
            if (userGender === 'nonBinary' && interest === 'women') {
                genderInterestQuery.push({ 'gender_identity': 'woman', 'gender_interest.nonBinary': true });
            }
            if (userGender === 'nonBinary' && interest === 'nonBinary') {
                genderInterestQuery.push({ 'gender_identity': 'nonBinary', 'gender_interest.nonBinary': true });
            }

        }

        const conditions = genderInterestQuery.length > 0 ? genderInterestQuery : []
        const query = {$or: conditions};

        const foundUsers = await users.find(query).toArray();
        res.send(foundUsers);
    } finally {
        await client.close();
    }
});



//Onboard a user
app.put('/user', async (req, res) => {
    const client = new MongoClient(uri)
    const formData = req.body.formData

    console.log('formData:', formData)

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = {user_id: formData.user_id}

        const updateDocument = {
            $set: {
                first_name: formData.first_name,
                dob_day: formData.dob_day,
                dob_month: formData.dob_month,
                dob_year: formData.dob_year,
                location: formData.location,
                show_gender: formData.show_gender,
                gender_identity: formData.gender_identity,
                gender_interest: {
                    men: formData.gender_interest.men,
                    women: formData.gender_interest.women,
                    nonBinary: formData.gender_interest.nonBinary
                },
                url: formData.url,
                about:formData.about,
                aboutlong: formData.aboutlong,
                matches: formData.matches
            },
        }

        const insertedUser = await users.updateOne(query, updateDocument)
        res.send(insertedUser)

    } finally {
        await client.close()
    }
}) 

app.put('/addmatch', async (req, res) => {
    const client = new MongoClient(uri)
    const {userId, matchedUserId} = req.body

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = {user_id: userId}
        const updateDocument = {
            $push: {matches: {user_id: matchedUserId}},
        }
        const user = await users.updateOne(query, updateDocument)
        res.send(user)
    } finally {
        await client.close()
    }
})

app.get('/messages', async (req, res) => {
    const client = new MongoClient(uri)
    const {userId, correspondingUserId} = req.query

    try {
        await client.connect()
        const database = client.db('app-data')
        const messages = database.collection('messages')
    
        const query = {
            from_userId: userId, to_userId: correspondingUserId
        }
        const foundMessages = await messages.find(query).toArray()
        res.send(foundMessages)
    } finally {
        await client.close()
    }
})

app.post('/message', async (req, res) => {
    const client = new MongoClient(uri)
    const message = req.body.message

    try {
        await client.connect()
        const database = client.db('app-data')
        const messages = database.collection('messages')
        const insertedMessage = await messages.insertOne(message)
        res.send(insertedMessage)
    } finally {
        await client.close()
    }
})

app.post('/addplace', async (req, res) => {
    const client = new MongoClient(uri)
    const {
        place_name,
        place_street,
        place_city,
        place_state,
        place_zip,
        place_metro,
        place_indoors,
        place_about,
        place_url,
      } = req.body
  
    try {
      await client.connect()
      const database = client.db('app-data')
      const places = database.collection('places')
  
      // You can add other properties if you have more form fields
      const newPlace = {
        place_name: place_name,
        place_street: place_street,
        place_city: place_city,
        place_state: place_state,
        place_zip: place_zip,
        place_metro: place_metro,
        place_indoors: place_indoors,
        place_about: place_about,
        place_url: place_url
      }
  
      // Insert the new place into the 'places' collection
      const insertedPlace = await places.insertOne(newPlace)
  
      res.status(201).json(insertedPlace)
    } catch (err) {
      console.error('Error adding place:', err)
      res.status(500).send('An error occurred while adding the place.')
    } finally {
      await client.close()
    }
})

//Display places on the PlaceList.js component by metro area
app.get('/places-by-metro', async (req, res) => {
    const client = new MongoClient(uri)

    try {
        await client.connect()
        const database = client.db('app-data')
        const places = database.collection('places')

        const pipeline = [
            {
                '$group': {
                    '_id': '$place_metro',
                    'places': { '$push': '$$ROOT' } // This will group all places with the same metro area together in an array
                }
            }
        ];

        const placesByMetro = await places.aggregate(pipeline).toArray()
        res.send(placesByMetro)

    } catch (error) {
        console.log(error)
        res.status(500).send('Error fetching places by metro area');
    } finally {
        await client.close()
    }
})

//Save a place to a user's array 
app.post('/save-places', async (req, res) => {
    const client = new MongoClient(uri)
    const { userId, savedPlaces } = req.body

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = { user_id: userId }
        const updateDocument = {
            $set: { saved_places: savedPlaces }
        }

        const result = await users.updateOne(query, updateDocument)
        res.status(200).send('Places saved successfully!')
    } catch (err) {
        console.error('Error saving places:', err)
        res.status(500).send('An error occurred while saving places.')
    } finally {
        await client.close()
    }
})


app.get('/save-places', async (req, res) => {
    const client = new MongoClient(uri);
    const userId = req.query.userId

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')
        const places = database.collection('places')

        console.log('Fetching saved places for user:', userId)

        const user = await users.findOne({user_id: userId})

        if (!user) {
            return res.status(404).send('User not found')
        }

        const savedPlacesIds = user.saved_places || []

        console.log('Saved place Ids:', savedPlacesIds)

        const savedPlaces = await places.aggregate([
            { 
                $match: { _id: { $in: savedPlacesIds.map(id => ObjectId(id)) } }
            },
            ]).toArray()

        console.log('Saved Places:', savedPlaces)

        res.status(200).json(savedPlaces); //return saved_places array, or an empty array if it doesn't exist

    } catch (err) {
        console.error('Error fetching saved places', err)
        res.status(500).send('An error occurred while fetching saved places.')
    } finally {
        await client.close()
    }
})


      


app.listen(PORT, () => console.log('Server running on PORT ' + PORT))