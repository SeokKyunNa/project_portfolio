export default function ProjectForm({
    title,
    content,
    start_date,
    end_date
}) {
    return (
        <div>
            <p>{title}</p>
            <p>{content}</p>
            <p>{start_date}</p>
            <p>{end_date}</p>
        </div>
    );
}