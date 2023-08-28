import { useState } from 'react'
import Nav from '../components/Nav'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const PlaceSubmit = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const [formData, setFormData] = useState({
        place_name: '',
        place_street: '',
        place_city: '',
        place_state: '',
        place_zip: '',
        place_metro: 'Dallas-Fort Worth',
        place_indoors: false,
        place_about: '',
        place_url: '',
    })

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('https://lmlmd-aaf8048793e5.herokuapp.com/addplace', formData)
            const success = response.status == 201
            if (success) navigate('/home')
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange =(e) => {
        console.log('e', e)
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        const name = e.target.name
        console.log('value' + value, 'name')

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    
    return (
        <>
            <Nav
                minimal={true}
                setShowModal={() => {}}
                showModal={false}
            />
            <div className="onboarding">
                <h2>SUBMIT A PLACE</h2>

                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="place_name">Name of Place</label>
                        <input
                            id="place_name"
                            type='text'
                            name="place_name"
                            placeholder="Place Name"
                            required={true}
                            value={formData.place_name}
                            onChange={handleChange}
                        />

                        <label>Address</label>
                        <input
                            id="place_street"
                            type="text"
                            name="place_street"
                            placeholder="Street Address"
                            required={true}
                            value={formData.place_street}
                            onChange={handleChange}
                        />

                        <div className="multiple-input-container">
                            <input
                                id="place_city"
                                type="text"
                                name="place_city"
                                placeholder="City"
                                required={true}
                                value={formData.place_city}
                                onChange={handleChange}
                            />

                            <input
                                id="place_state"
                                type="text"
                                name="place_state"
                                placeholder="State"
                                required={true}
                                value={formData.place_state}
                                onChange={handleChange}
                            />

                            <input
                                id="place_zip"
                                type="number"
                                name="place_zip"
                                placeholder="Zip"
                                required={true}
                                value={formData.place_zip}
                                onChange={handleChange}
                            />

                        </div>


                        <label>Metro</label>
                        <div className="multiple-input-container">
                            <input
                                id="dfw-metro"
                                type="radio"
                                name="place_metro"
                                value="Dallas-Fort Worth"
                                onChange={handleChange}
                                checked={formData.place_metro === "Dallas-Fort Worth"}
                            />
                            <label htmlFor="dfw-metro">Dallas-Forth Worth</label>

                            <input
                                id="austin-metro"
                                type="radio"
                                name="place_metro"
                                value="Austin"
                                onChange={handleChange}
                                checked={formData.place_metro === "Austin"}
                            />
                            <label htmlFor="austin-metro">Austin</label>
                            <input
                                id="sf-metro"
                                type="radio"
                                name="place_metro"
                                value="SF Bay Area"
                                onChange={handleChange}
                                checked={formData.place_metro === "SF Bay Area"}
                            />
                            <label htmlFor="sf-metro">SF Bay Area</label>
                        </div>

                        <label htmlFor="place-indoors">Check below if this place is indoors.</label>

                        <input
                            id="place_indoors"
                            type="checkbox"
                            name="place_indoors"
                            onChange={handleChange}
                            checked={formData.place_indoors}
                        />


                        <label htmlFor="about">About This Place</label>
                        <input
                            id="place_about"
                            type="text"
                            name="place_about"
                            required={false}
                            placeholder="A great place to bring your date and your dog"
                            value={formData.place_about}
                            onChange={handleChange}
                        />

                        <label htmlFor="url">Website</label>
                        <input
                            type="url"
                            name="url"
                            id="url"
                            onChange={handleChange}
                            required={false}
                        />
                        {/* <div className="photo-container">
                            {formData.url && <img src={formData.url} alt="profile pic preview"/>}
                        </div> */}

                        <button className="primary-button">Submit
                        </button>   


                    </section>

                </form>
            </div>
        </>
    )
}

export default PlaceSubmit