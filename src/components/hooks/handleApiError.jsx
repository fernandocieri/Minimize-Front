import { useState } from "react";

export default function HandleApiError() {
    const [apiError, setApiError] = useState({ render: false, message: '' });
    const apiErrorRender = (
        apiError.render ? <sub className='error-message'>{apiError.message}</sub> : <></>
    )

    return [apiError, setApiError, apiErrorRender];
}