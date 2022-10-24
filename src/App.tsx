import {FirebaseProvider} from "./providers/FirebaseProvider";
import {Game} from "./modules/Game/Game";
import {GameStartPage} from "./modules/GameStartPage";
import {useStatusOfGame} from "./providers/StatusOfGame/StatusOfGame";

function App() {
    const {status} = useStatusOfGame()
    return (
        <FirebaseProvider>
            {(status === 'beforeStart' || status === 'finish') && (
                <GameStartPage/>
            )}
            {status === 'gameInProgress' && (
                <Game/>
            )}
        </FirebaseProvider>
    )
}

export default App
