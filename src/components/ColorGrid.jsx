import { StyleSheet, View, Text,Pressable } from "react-native";
import { useState } from "react";
const size = 8;
const ColorGrid = () => {
    const board = Array.from({ length: size }, (_i, index) => new Array(size).fill(false));
    const [grid, setGrid] = useState(board);
    const handlePress = (rowIndex,colIndex)=> {
        setGrid((preState)=> {
            const newGrid = preState.map((row)=>[...row]);
            if(rowIndex - 1 >= 0) newGrid[rowIndex-1][colIndex] = !newGrid[rowIndex-1][colIndex];
            if(rowIndex + 1 < size) newGrid[rowIndex+1][colIndex] = !newGrid[rowIndex+1][colIndex];

            if(colIndex -1 >=0) newGrid[rowIndex][colIndex -1] = !newGrid[rowIndex][colIndex-1];
            if(colIndex + 1 < size) newGrid[rowIndex][colIndex + 1] = !newGrid[rowIndex][colIndex+1];
            return newGrid;
        })
    }
    return (
        <View style={styles.container}>
            {
                grid.map((rows, rowIndex) => {
                    return (
                        <View key={rowIndex} style={styles.row}>
                            {rows.map((col, colIndex) => {
                                return (
                                    <Pressable onPress={()=>handlePress(rowIndex,colIndex)}>
                                        <View key={`${rowIndex}-${colIndex}`} style={[styles.cell,col ? styles.selected : null ]} />
                                    </Pressable>
                                );
                            })}
                        </View>
                    );
                })
            }
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        padding: 10
    },
    row: {
        flexDirection: "row",
        flex: 1,
    },
    cell: {
        justifyContent: "center",
        alignItems: "center",
        color: "black",
        padding: 5,
        borderWidth: 0.5,
        height: 40,
        width: 40
    },
    selected :{
        backgroundColor:"green"
    }
})
export default ColorGrid;