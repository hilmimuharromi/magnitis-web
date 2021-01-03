import React from "react"

import { connect } from 'react-redux';
import { GetListQuiz, SetPembelajaran } from "stores/action"
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";




const ItemData = styled.h6`
  color: #7B7B7B;
  text-align: center;
  font-family: sans-serif;
  font-size: 20px;
  margin: 0px;
  padding: 15px;
  text-transform: none;
`

const ListItemData = styled.div`
  width: 100%;
  background: #FFFFFF;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: ${props => props.isDragging ? '0px 10px 20px rgba(0, 0, 0, 0.25)' : '0px 4px 4px rgba(0, 0, 0, 0.25)'};
  cursor: pointer;
`
const CardTitle = styled.h3`
  color: #FFFFFF;
  text-align: center;
  margin-bottom: 25px;
  font-family: sans-serif;
  font-size: 25px;
  font-weight: bold;
`


const TipeList = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid ${props => props.colorTag};
  color: ${props => props.colorTag}
  margin: 0 1em;
  padding: 0.25em 1em;
`




const ListPembelajaran = (props) => {
    const { data, SetData, } = props

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const deleteItem = (list, i) => {
        const newData = list.filter((item, index) => index !== i)
        console.log(newData)
        return newData
    }

    function onDragEnd(result) {
        if (!result.destination) {
            SetData(deleteItem(data, result.source.index))
            return;
        }
        if (result.destination.index === result.source.index) {
            return;
        }
        const newData = reorder(
            data,
            result.source.index,
            result.destination.index
        );
        SetData(newData)

    }


    const ItemList = React.memo(function ItemList({ listData }) {
        return listData.map((item, index) => (
            <Item itemData={item} index={index} key={item._id} />
        ));
    });

    function Item({ itemData, index }) {
        return (
            <Draggable draggableId={itemData._id} index={index}>
                {(provided) => (
                    <ListItemData
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <ItemData >
                            {itemData.title}
                        </ItemData>
                        <div style={{ display: "flex", justifyContent: "flex-end", padding: "3px" }}>
                            <TipeList colorTag={itemData.flag === "post" ? "mediumseagreen" : "palevioletred"}>{itemData.flag === "post" ? "Materi" : "Kuis"}</TipeList>
                        </div>
                    </ListItemData>
                )}
            </Draggable>
        );
    }

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="list">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}
                            style={{
                                width: "500px",
                                backgroundColor: "#17C9FF",
                                boxShadow: "25px 25px 50px rgba(0, 0, 0, 0.15)",
                                border: "4px dashed rgba(0,0,0,0)",
                                borderRadius: "40px",
                                padding: "15px",
                                minHeight: "400px"
                            }}
                        >
                            <CardTitle>
                                - Pembelajaran -
                            </CardTitle>
                            <ItemList listData={data} />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    )
}

const mapStateToProps = state => {
    const { Pembelajaran } = state;
    const { data } = Pembelajaran

    return {
        data: data,
    };
}
const mapDispatchToProps = {
    GetListQuiz,
    SetData: SetPembelajaran
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPembelajaran, ItemData);