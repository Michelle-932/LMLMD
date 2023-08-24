import { useState } from 'react'
import Nav from '../components/Nav'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const OnBoarding = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        first_name: '',
        dob_day: '',
        dob_month: '',
        dob_year: '',
        location: '',
        show_gender: false,
        gender_identity: 'man',
        gender_interest: {
            men: false,
            women: false,
            nonBinary: false,
        },
        email: '',
        url: '',
        about: '',
        aboutlong: '',
        matches: []
    })

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put('https://kind-jade-katydid-tie.cyclic.cloud/user', {formData})
            const success = response.status == 200
            if (success) navigate('/dashboard')
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        const { type, name, checked, value } = e.target;

        console.log('name:', name)
        console.log('checked:', checked)
    
        if (type === 'checkbox') {
            if (name === 'show_gender') {
                setFormData((prevState) => ({
                    ...prevState,
                    show_gender: checked
                }))
            } else if (name.includes('gender_interest') || (name.includes('men') || (name.includes('women') || (name.includes('nonBinary'))))) {
                setFormData((prevState) => ({
                    ...prevState,
                    gender_interest: {
                        ...prevState.gender_interest,
                        [name.replace('gender_interest', '')]: checked
                    }
                }))
            }
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value
            }))
        }
    }

    return (
        <>
            <Nav
                minimal={true}
                setShowModal={() => {}}
                showModal={false}
            />
            <div className="onboarding">
                <h2>CREATE ACCOUNT</h2>

                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="first_name">First Name</label>
                        <input
                            id="first_name"
                            type='text'
                            name="first_name"
                            placeholder="First Name"
                            required={true}
                            value={formData.first_name}
                            onChange={handleChange}
                        />

                        <label>Birthday</label>
                        <div className="multiple-input-container">
                            <input
                                id="dob_day"
                                type="number"
                                name="dob_day"
                                placeholder="DD"
                                required={true}
                                value={formData.dob_day}
                                onChange={handleChange}
                            />

                            <input
                                id="dob_month"
                                type="number"
                                name="dob_month"
                                placeholder="MM"
                                required={true}
                                value={formData.dob_month}
                                onChange={handleChange}
                            />

                            <input
                                id="dob_year"
                                type="number"
                                name="dob_year"
                                placeholder="YYYY"
                                required={true}
                                value={formData.dob_year}
                                onChange={handleChange}
                            />
                        </div>

                        <label htmlFor="first_name">Location</label>
                        <input
                            id="location"
                            type='text'
                            name="location"
                            placeholder="Dallas, TX"
                            required={true}
                            value={formData.location}
                            onChange={handleChange}
                        />

{/* ------ Gender Identity ------ */}
                        <label>Gender</label>
                        <div className="multiple-input-container">

                            <input
                                id="man-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="man"
                                onChange={handleChange}
                                checked={formData.gender_identity === "man"}
                            />
                            <label htmlFor="man-gender-identity">Man</label>

                            <input
                                id="woman-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="woman"
                                onChange={handleChange}
                                checked={formData.gender_identity === "woman"}
                            />
                            <label htmlFor="woman-gender-identity">Woman</label>

                            <input
                                id="more-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="nonBinary"
                                onChange={handleChange}
                                checked={formData.gender_identity === "nonBinary"}
                            />
                            <label htmlFor="more-gender-identity">Non Binary</label>

                        </div>

{/* ------- Show Gender ------- */}
                        <label htmlFor="show-gender">Show Gender on my Profile?</label>
                        <input
                            id="show-gender"
                            type="checkbox"
                            name="show_gender"
                            onChange={handleChange}
                            checked={formData.show_gender}
                        />


{/* ---------- Gender Interest --------- */}
                        <label>I'm Interested In...</label>

                        <div className="multiple-input-container">

                            <input
                                id="man-gender-interest"
                                type="checkbox"
                                name="men"
                                value="man"
                                onChange={handleChange}
                                checked={formData.gender_interest.men || false}
                            />
                            <label htmlFor="man-gender-interest">Man</label>

                            <input
                                id="woman-gender-interest"
                                type="checkbox"
                                name="women"
                                value="woman"
                                onChange={handleChange}
                                checked={formData.gender_interest.women || false}
                            />
                            <label htmlFor="woman-gender-interest">Woman</label>

                            <input
                                id="nonBinary-gender-interest"
                                type="checkbox"
                                name="nonBinary"
                                value="nonBinary"
                                onChange={handleChange}
                                checked={formData.gender_interest.nonBinary || false}
                            />
                            <label htmlFor="everyone-gender-interest">Non Binary</label>

                        </div>



                        <label htmlFor="about">Tagline</label>
                        <input
                            id="about"
                            type="text"
                            name="about"
                            required={true}
                            placeholder="Tell us about yourself in 10 words or less"
                            value={formData.about}
                            onChange={handleChange}
                        />

                        <label htmlFor="about">About</label>
                        <input
                            id="aboutlong"
                            type="text"
                            name="aboutlong"
                            required={true}
                            placeholder="Tell us more about what you're looking for"
                            value={formData.aboutlong}
                            onChange={handleChange}
                        />

                        <input type="submit"/>

                    </section>

                    <section>

                        <label htmlFor="url">Profile Photo</label>
                        <input
                            type="url"
                            name="url"
                            id="url"
                            onChange={handleChange}
                            required={true}
                        />
                        <div className="photo-container">
                            {formData.url && <img src={formData.url} alt="profile pic preview"/>}
                        </div>


                    </section>

                </form>
            </div>
        </>
    )
}

export default OnBoarding