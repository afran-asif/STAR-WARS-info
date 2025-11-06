import React, { useState } from "react";

export default function App() {
    const [category, setCategory] = useState("people");
    const [id, setId] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchData = async () => {
        if (!id) {
        setError("Please enter an ID number!");
        return;
        }

        setLoading(true);
        setError("");
        setData(null);

        try {
        const response = await fetch(`https://swapi.dev/api/${category}/${id}/`);
        if (!response.ok) throw new Error("Data not found");
        const result = await response.json();
        setData(result);
        } catch (err) {
        setError("Data not found or invalid ID!");
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="min-vh-100 bg-light-gray white flex flex-column items-center pa4">
        <h1 className="f2 mb4 black">🌠 Star Wars Info</h1>

        {/* Input Card */}
        <div className="bg-dark-gray pa4 br3 shadow-5 w-100 mw6 mb4">
            <div className="mb3">
            <label className="db mb2 f5">Select Category:</label>
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="pa2 w-100 br2"
            >
                <option value="people">People</option>
                <option value="planets">Planets</option>
                <option value="starships">Starships</option>
            </select>
            </div>

            <div className="mb3">
            <label className="db mb2 f5">Enter ID:</label>
            <input
                type="number"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="1"
                className="pa2 w-100 br2"
            />
            </div>

            <button
            onClick={fetchData}
            className="pa2 w-100 bg-yellow black br2 b--black pointer dim"
            >
            Get Info
            </button>
        </div>

        {/* Result Card */}
        {loading && <p className="f4">🔄 Loading...</p>}
        {error && <p className="f4 red">{error}</p>}
        {data && (
            <div className="bg-mid-gray pa4 br3 shadow-5 w-100 mw6">
            <h2 className="f3 mb3">{data.name || data.title}</h2>

            {category === "people" && (
                <div className="f5 lh-copy">
                <p>Height: {data.height}</p>
                <p>Birth Year: {data.birth_year}</p>
                <p>Gender: {data.gender}</p>
                <p>Eye Color: {data.eye_color}</p>
                </div>
            )}

            {category === "planets" && (
                <div className="f5 lh-copy">
                <p>Climate: {data.climate}</p>
                <p>Population: {data.population}</p>
                <p>Terrain: {data.terrain}</p>
                </div>
            )}

            {category === "starships" && (
                <div className="f5 lh-copy">
                <p>Model: {data.model}</p>
                <p>Manufacturer: {data.manufacturer}</p>
                <p>Crew: {data.crew}</p>
                <p>Speed: {data.max_atmosphering_speed}</p>
                </div>
            )}
            </div>
        )}
        </div>
    );
}
