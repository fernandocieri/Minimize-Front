import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();
    
    return (
        <section className='url-not-found'>
            <h3 className='broad-title not-found-notice'>Ooops!! Something went wrong</h3>
            <p className='not-found-message'>
                the url your tried to reach does not exist. What were you trying to do? You, silly goose, you're so silly.
                Sometimes we get distracted and don't really pay attention to what we're doing... but don't worry!!
                It happens to the best of us. Just make sure next time you're focused!
            </p>
            <p className='not-found-message'>
                Ok! Why don't you try again? Here use this warp portal disguised as a button to go back to our main page.
            </p>
            <button className='action-button' onClick={() => { navigate('/') }}>Back Home</button>
        </section>
    )
}
