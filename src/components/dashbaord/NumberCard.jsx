const NumberCard = ({ cards = {} }) => {

    const stats = [
        { title: "Movies", value: cards.movies, icon: "bi-film", footer: "Format", col: "col-md-2" },
        { title: "Series", value: cards.series, icon: "bi-tv", footer: "Format", col: "col-md-2" },
        { title: "Other", value: cards.others, icon: "bi-collection-play", footer: "Industry", col: "col-md-4" },
        { title: "Bollywood", value: cards.bollywood, icon: "bi-camera-reels", footer: "Industry", col: "col-md-2" },
        { title: "Hollywood", value: cards.hollywood, icon: "bi-globe", footer: "Industry", col: "col-md-2" }
    ];

    return (
        <div className="row mt-5">
            {stats.map((item, index) => (
                <div className={item.col} key={index}>
                    <div className="card mt-3 shadow-sm position-relative p-3">
                        <div className="icon-box position-absolute top-0 start-0 translate-middle-y ms-4">
                            <i className={`bi ${item.icon}`}></i>
                        </div>
                        <div className="text-end">
                            <h6 className="text-muted">{item.title}</h6>
                            <h3 className="fw-bold">{item.value || 0}</h3>
                            <figcaption className="blockquote-footer">
                                {item.footer}
                            </figcaption>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NumberCard;