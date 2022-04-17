import { useState } from "react";

import { useForm } from "react-hook-form";
import axios from "axios";

import useFormValidation from "../hooks/useFormValidation";

export default function MinimizerTool() {
    const [minimizedUrl, setMinimizedUrl] = useState();
    const minimizeApiUrl = process.env.REACT_APP_MINIMIZE_API_URL;
    const validations = useFormValidation
    const { register, handleSubmit, formState: { errors } } = useForm();

    function copyToClipboard() {
        navigator.clipboard.writeText(minimizedUrl);
    }

    const toolFeedback = (
        <div className='fake-input-wapper'>
            <p className='small-label'>Here you go!</p>
            <div className='button-input'>
                <div className='fake-input'>{minimizedUrl}</div>
                <button className='action-button' onClick={copyToClipboard}>Copy!</button>
            </div>
        </div>
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
        <section className="minimizer-tool-wrapper">
            <h2 className='narrow-title'>Get started inmediately</h2>
            <form onSubmit={handleSubmit(minimize)} className='minimizer-tool'>
                <div className='input-wrapper'>
                    <label className='small-label' htmlFor='url-input'>Paste the URL to be shortened</label>
                    <input className='basic-input' type='text' id='url-input' placeholder='your loooong url' required
                        {...register('url', { required: { ...validations.required }, pattern: { ...validations.url } })} />
                    <sub className='error-message'>{errors.url?.message}</sub>
                </div>

                <div className='input-wrapper'>
                    <label className='small-label' htmlFor='name-input'>Add a custom name to the short URL</label>
                    <input className='basic-input' type='text' id='name-input' placeholder='best-name'
                        {...register('customName', { pattern: { ...validations.customName } })} />
                    <sub className='error-message'>{errors.customName?.message}</sub>
                </div>

                <button type='submit' className='action-button'>Minimize!</button>
            </form>

            {minimizedUrl ? toolFeedback : <></>}
        </section>
    )
}
