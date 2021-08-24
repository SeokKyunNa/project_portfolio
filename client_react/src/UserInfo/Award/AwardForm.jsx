import axios from "axios";

const authedAxios = axios.create({
    headers: {
        Authorization: 'access_token_cookie'
        // Authorization: `Bearer ${token}`
    }
});

const getAwardList = async (id) => {
    await authedAxios.get("http://127.0.0.1:5000/award/test1@test.com")
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        })
}

export default function AwardForm(props) {
    return (
        <div>
            <button onClick={getAwardList} />
        </div>
    );
}