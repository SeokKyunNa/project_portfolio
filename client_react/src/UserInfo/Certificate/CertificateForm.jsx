export default function CertificateForm({
    name,
    issued_by,
    acquisition_date
}) {
    return (
        <div>
            <p>{name}</p>
            <p>{issued_by}</p>
            <p>{acquisition_date}</p>
        </div>
    );
}