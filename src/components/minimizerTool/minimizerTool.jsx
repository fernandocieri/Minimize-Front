import { useState } from "react";

import { useForm } from "react-hook-form";
import axios from "axios";

export default function MinimizerTool() {
    const [minimizedUrl, setMinimizedUrl] = useState();
    const minimizeApiUrl = process.env.REACT_APP_MINIMIZE_API_URL;
    const validations = {
        required: {
            value: true,
            message: 'this is required'
        },
        url: {
            value: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
            message: 'invalid format'
        },
        customName: {
            value: /^[a-z]+(-[a-z]+)*$/,
            message: 'can only be lowercase and separated by hyphens'
        }
    }
    const { register, handleSubmit, formState: { errors } } = useForm();

    function copyToClipboard() {
        navigator.clipboard.writeText(minimizedUrl);
    }

    const toolFeedback = (
        <>
            <p className='small-label'>Here you go!</p>
            <div>{minimizedUrl}</div>
            <button onClick={copyToClipboard}>Copy!</button>
        </>
    )

    function removeEmptyFields(data) {
        Object.keys(data).forEach(key => {
            if (data[key] === '' || data[key] == null) {
                delete data[key];
            }
        });
    }

    async function minimize(userInput) {
        removeEmptyFields(userInput);
        const response = await axios.post(`${minimizeApiUrl}`, userInput);
        setMinimizedUrl(response.data);
    }

    return (
        <section className="minimizer-tool">
            <h2>Get started inmediately</h2>
            <form onSubmit={handleSubmit(minimize)}>
                <label className='small-label' htmlFor='url-input'>Paste the URL to be shortened</label>
                <input className='basic-input' type='text' id='url-input' placeholder='your loooong url' required
                    {...register('url', { required: { ...validations.required }, pattern: { ...validations.url } })} />
                <sub className='error-message'>{errors.url?.message}</sub>

                <label className='small-label' htmlFor='name-input'>Add a custom name to the short URL</label>
                <input className='basic-input' type='text' id='name-input' placeholder='best-name'
                    {...register('customName', { pattern: { ...validations.customName } })} />
                <sub className='error-message'>{errors.customName?.message}</sub>

                <button type='submit'>Minimize!</button>
            </form>

            {minimizedUrl ? toolFeedback : <></>}
        </section>
    )
}
