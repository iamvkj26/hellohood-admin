import { formatDate } from "../../utils/formatDate";

const ContactCard = ({ contact }) => {
    return (
        <div className="col-md-6 mt-3">
            <div className="card text-center">
                <div className="card-body">
                    <h5 className="card-title">{contact.name}</h5>
                    <p className="card-text text-info">{contact.message}</p>
                    <div className="row">
                        <p className="card-text col-md-6 text-muted">{contact.email}</p>
                        <p className="card-text col-md-6 text-muted">{contact.mobile}</p>
                    </div>
                </div>
                <div className="card-footer bg-141414 small text-end text-danger">
                    {formatDate(contact.createdAt)}
                </div>
            </div>
        </div>
    );
};

export default ContactCard;