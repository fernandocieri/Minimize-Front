import { useState } from "react";

import { useForm } from "react-hook-form";
import axios from "axios";

import useFormValidation from "../hooks/useFormValidation";
import useHandleApiError from "../hooks/useHandleApiError";

export default function UrlPerformance() {
    const [urlClicks, setUrlClicks] = useState();
    const [apiError, setApiError, apiErrorRender] = useHandleApiError();
    const validations = useFormValidation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const minimizeApiUrl = process.env.REACT_APP_MINIMIZE_API_URL;

    const urlClicksRender = (
        <div className='row-display'>
            <div className='urlClicks'>{urlClicks}</div>
            <div className='clicks-unit'>{(urlClicks === 1) ? 'click' : 'clicks'}</div>
        </div>
    )

    async function getUrlClicks(userInput) {
        try {
            const formattedShortUrl = userInput.url.split(process.env.REACT_APP_MINIMIZE_FRONT_URL)[1];
            const response = await axios.get(`${minimizeApiUrl}/${formattedShortUrl}/clicks`);
            if (apiError.render) {
                setApiError({ ...apiError, render: false })
            }
            setUrlClicks(response.data);
        } catch (error) {
            const notFound = 404;
            if (error.response.status === notFound) {
                setApiError({ render: true, message: "This URL was not Minimized®." });
            } else {
                setApiError({ render: true, message: "Something's wrong. Try again later." });
            }
        }
    }

    return (
        <section className='url-performance-wrapper'>
            <h2 className='broad-title'>Assess the performance of your URL</h2>
            <p className='section-explanation'>
                We track how many clicks your minimized URLs get.
                Want to get a glimpse of that? Paste your short url below.
            </p>

            <form onSubmit={handleSubmit(getUrlClicks)} className='performance-tool'>
                <div className='row-display'>
                    <input className='basic-input button-input' type='text' id='url-performance-input' placeholder='your-minimized-url' required
                        {...register('url', { required: { ...validations.required } })} />
                    <button type='submit' className='action-button'>Assess!</button>
                </div>
                <sub className='error-message'>{errors.url?.message}</sub>
                {apiErrorRender}
            </form>

            {urlClicks >= 0 ? urlClicksRender : <></>}
        </section>
    )
}
