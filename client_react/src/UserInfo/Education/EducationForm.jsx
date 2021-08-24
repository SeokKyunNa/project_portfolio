export default function EducationForm({
    name,
    major,
    status
}) {
    return (
        <div>
            <p>{name}</p>
            <p>{major}</p>
            <p>{status}</p>
        </div>
    );
}