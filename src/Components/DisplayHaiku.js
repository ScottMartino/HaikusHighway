/* import useContext and AppContext Component to useStates on the context component */
import { useContext, useEffect } from "react";
import { AppContext } from "./AppContextProvider";

const DisplayHaiku = () => {
    const {

        syllableLineOne, setSyllableLineOne,
        lineOne, setLineOne,
        completedHaiku, setCompletedHaiku,
    } = useContext(AppContext);

    useEffect(() => {
        if (completedHaiku.length === 0 && syllableLineOne === 0) {
            setCompletedHaiku([lineOne]);
            setLineOne('');
            setSyllableLineOne(7)
        } else if (completedHaiku.length === 1 && syllableLineOne === 0) {
            const twoLines = [...completedHaiku];
            twoLines.push(lineOne);
            setCompletedHaiku(twoLines);
            setLineOne('');
            setSyllableLineOne(5)
        } else if (completedHaiku.length === 2 && syllableLineOne === 0) {
            const threeLines = [...completedHaiku];
            threeLines.push(lineOne);
            setCompletedHaiku(threeLines);
            setLineOne('')
        }
    }, [completedHaiku, setLineOne, setSyllableLineOne, syllableLineOne, lineOne, setCompletedHaiku])

    return (
        <ul>
            {completedHaiku.map((line, index) => {
                return (
                    <li key={`line-${index}`}>{line}</li>
                )
            })
            }
        </ul>
    )
}

export default DisplayHaiku