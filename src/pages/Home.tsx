import React, { useState,} from 'react';
import {IonRadioGroup, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonModal, IonRadio } from '@ionic/react';
import './Home.css';

const Input: React.FC = () => {

  const [text, setText] = useState<string>();

  return (
    <React.Fragment>
      <IonInput value={text} className="input" placeholder="Enter Input" onIonChange={e => setText(e.detail.value!)}></IonInput>
      <IonButton color="dark" className="addBtn" onClick={() => {
          localStorage.setItem(JSON.stringify(text), JSON.stringify(text))
        }}> 
        Add To List
      </IonButton>
    </React.Fragment>
  ) //end Input return 
}// end const Input


const Item: React.FC = () => {

  const [temp, setTemp] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [listItems, setListItems] = useState<string[]>([...Object.keys(localStorage).map(key => localStorage.getItem(key))] as string[]);
  const [text, setText] = useState<string>();
  

  function colorPicker(index: number) {
    var color = ""
    if ((index % 2) == 0) {
      color = "primary"
    } else {
      color = "secondary"
    }
    return color;
  }//end colorPicker

  return (

    <React.Fragment>
      <ul className="IonL">
        {listItems.map((listitem, index) => (

          <IonItem color={colorPicker(index)}>
            <IonRadioGroup><IonRadio /></IonRadioGroup>
            <IonLabel className="IonL">{listitem}</IonLabel>

            <IonButton fill="clear" className="pencilBtn" color="tertiary" onClick={() => {
              console.log(listItems[index])
              setTemp(listItems[index])
              setShowModal(true)
            }}>
              <div className="pencil"></div>
            </IonButton>
            {showModal && 
              <IonContent>
              <IonModal isOpen={showModal} cssClass='mC'>
                <IonLabel className="modalTitle">Edit Task</IonLabel>
                <IonInput placeholder={temp} className="modalInput"  onIonChange={e => setText(e.detail.value!)}></IonInput>
                <ul>
                  <li><button className="editBtn" onClick={() => 

                  localStorage.setItem(temp, JSON.stringify(text))
                      
                  }>Save</button></li>
                  <li><button className="cancelBtn" onClick={() => setShowModal(false)}>Cancel</button></li>
                </ul>
              </IonModal>

              </IonContent>
            }

            <IonButton fill="clear" className="btn" color="tertiary" onClick={() => {
              localStorage.removeItem(JSON.stringify(listitem))
            }}>
              <div className="trash"></div>
            </IonButton>
          </IonItem>

        ))}
      </ul>
    </React.Fragment>
  ) //end Item return 
} //end const Item


export const Home: React.FC = () => { //react functional component can do about anything a react functional compent can do, lets you use hooks, more modern

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <br></br><br></br>
          <div className="ion-text-center">
            <IonTitle>My To Do List</IonTitle>
          </div><br></br>
          <Input></Input>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Item></Item>
      </IonContent>
    </IonPage>
  ); //end Home return
}; //end const Home

export default Home;
