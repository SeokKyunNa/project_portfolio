export default function ProfileForm({
    name,
    image,
    introduction
}) {
    return (
        <div>
            <p>{image}</p>
            <p>{name}</p>
            <p>{introduction}</p>
        </div>
    );
}