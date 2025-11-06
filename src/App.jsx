import React ,{ useState } from "react";

export default function App() {
    const [category, setCategory] = useState("people");
    const [id , setId] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] =useState("");
    
    const fetchData = async () => {
        if (!id) return ("Please enter an ID number!");

        setLoading(true);
        setError("");
        setData(null);

        try{
            const response = await fetch(`https://swapi.dev/api/${category}/${id}/`);
            if (!response) throw new Error("Data not found");
            const result = await response.json();
            setData (result);
            
        } catch (err) {
            setError("Data Not found or invalid ID!");
        }finally {
            setLoading(false);
        }
    };
    return(
    <div>
        <div>
            <h1>🌠 Star Wars Character Info</h1>
            <select value = {category} onChange={(e) => setCategory(e.target.value)}>
                <option value="people">People</option>
                <option value="planets">Planets</option>
                <option value="starships">Starships</option>
            </select>
            <p>Enter a character ID:</p>
            <input type="number" value={id} onChange={(e) => setId(e.target.value)} placeholder="1" ></input>
            <button onClick={fetchData}>Get Info</button>
        </div>

        <div>
            {loading && <p>🔄 Loading...</p>}
            {error && <p>{error}</p>}
            {data &&(
                <>
                <h1>{ data.name || data.title }</h1>

                { category === "people" && (
                    <>
                    <p>Height: { data.height }</p>
                    <p>Birth Year: {data.birth_year}</p>
                    <p>Gender: {data.gender}</p>
                    <p>Eye Color: {data.eye_color}</p>
                    </>
                )}
                { category === "planets" && (
                    <>
                    <p>Climate: {data.climate}</p>
                    <p>Population: {data.population}</p>
                    <p>Terrain: {data.terrain}</p>
                    </>
                )}
                {category === "starships" && (
                <>
                    <p>Model: {data.model}</p>
                    <p>Manufacturer: {data.manufacturer}</p>
                    <p>Crew: {data.crew}</p>
                    <p>Speed: {data.max_atmosphering_speed}</p>
                </>
            )}
                </>
            )}
        </div>
    </div>
    )
};