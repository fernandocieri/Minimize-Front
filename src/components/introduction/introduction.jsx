import MinimizerTool from "../minimizerTool/minimizerTool"

export default function Introduction() {
    return (
        <section className='first-fold'>
            <section className='introduction-wrapper'>
                <h1>Minimize: an URL shortener</h1>
                <p className='introduction'>Minimize™ is a free tool to shorten an URL or reduce a link. Use our Minimizer Tool™ to create a shortened link making it easy to remember and market.</p>
                <p className='introduction'>Boost results. On top of better deliverability and click-through, rich link-level data gives you crucial insight into your link engagement so your team can make smarter decisions around its content and communications.</p>
            </section>
            <MinimizerTool />
        </section>
    )
}
