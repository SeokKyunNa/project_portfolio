import axios from "axios";

const getAwardList = async (id) => {
    await axios.get("http://localhost:5000/award/<id>")
        .then(response => {
            console.log(response);
        })
}

export default function AwardForm(props) {
    return (
        <div>
            <button onClick={getAwardList} />
        </div>
    );
}