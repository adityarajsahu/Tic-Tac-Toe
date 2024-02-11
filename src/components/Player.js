import { useState } from "react";

const Player = ({ name, symbol, isActive, onChangeName }) => {
    const [playerName, setPlayerName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing((editing) => !editing);
        if (isEditing) {
            onChangeName(symbol, playerName);
        }
    };

    const handleChange = (event) => {
        setPlayerName(event.target.value);
    };

    let editablePlayername = <span className="player-name">{playerName}</span>;

    if (isEditing) {
        editablePlayername = <input type="text" value={playerName} onChange={handleChange} required />;
    }

    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {editablePlayername}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
};

export default Player;
