import axios from 'axios'

const config = axios.create({
    baseURL: 'https://www.jsonbulut.com/json/'
})

const ref = '941a10ba728df6591038f46c98f1898d'

export const FormServices = () => {
    const params = {
        ref:ref,
        formId:30
    }
    return config.get("forms.php",{params:params})
}