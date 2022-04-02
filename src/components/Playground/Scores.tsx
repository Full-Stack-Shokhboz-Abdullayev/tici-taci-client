import O from '../../assets/images/o.svg';
import X from '../../assets/images/x.svg';
import useGameStore from '../../store/game.store';
import { PlayerType } from '../../typings/Playground/types/player.type';

const Scores = () => {
  const players = useGameStore((state) => state.players);
  return players.local && players.remote ? (
    <div className="flex items-center justify-center">
      {Object.keys(players).map((playerType) => {
        const player = players[playerType as PlayerType];
        return (
          <div className="mx-4 flex items-center justify-center" key={player?.sign}>
            <span className="font-bold flex items-center justify-center">
              {player?.name}
              <img
                className="h-4 w-4 m-2"
                src={player?.sign === 'X' ? X : O}
                alt={player?.sign}
              />
            </span>
            : {player?.score}
          </div>
        );
      })}
    </div>
  ) : (
    <></>
  );
};

export default Scores;
