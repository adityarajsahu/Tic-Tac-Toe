const Player = ({ name, symbol }) => {
    return (
        <li>
            <span className="player">
                <span className="player-name">{name}</span>
                <span className="palyer-symbol">{symbol}</span>
            </span>
            <button>Edit</button>
        </li>
    );
};

export default Player;
