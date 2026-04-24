const CastBadge = ({ casts = [] }) => {

    if (!casts.length) return null;

    return (
        <div className="card-text text-center text-light">
            <strong className="text-light">Cast:</strong>
            <br />
            <i className="fst-italic">{casts.join(", ")}</i>
        </div>
    );
};

export default CastBadge;