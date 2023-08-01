import css from './Home.module.css'
export const Home = () => {
    return (
        <main className={css.home_main}>
            <section className={css.hero}>
                <h1 className={css.hero_h1}>Follow!</h1>
                <p className={css.hero_paragraph}>User-Friendly React.js app</p>
            </section>
        </main>
    );
};
