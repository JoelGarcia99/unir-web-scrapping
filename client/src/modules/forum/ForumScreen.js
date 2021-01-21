import React, { useEffect, useMemo, useState } from 'react';
import { Redirect } from 'react-router-dom';
import MainReply from './MainReply';
import Reply from './Reply';
import SubForum from './SubForum';
import TopBar from './TopBar';

const ForumScreen = () => {

    const [forums, setForums] = useState({});
    const [logged, setLogged] = useState(true);
    const [message, setMessage] = useState({});

    const fetchData = async()=>{
        let output = await fetch("http://127.0.0.1:5000/status");
        let responseJSON = await output.json();

        if(!responseJSON.active) {
            setLogged(false);
            return {};
        }
        else {            
            let res = await fetch("http://127.0.0.1:5000/post");
            let response2 = await res.json();
            return response2;
        }
    }

    useMemo(async() => await fetchData(), []).then(setForums);

    let values = [];

    for(let value in forums) {
        values.push(value);
    }

    return !logged?<Redirect to="/login" />:(
        <div className="forum-container">
            <TopBar />
            <div className="forum-content">
                <div className="forum-entries">
                    {values.map(e=>
                        <>
                        <div 
                            key={"div."+e}
                            className="forum-entry"
                        >{e}</div>
                        <SubForum
                            key={"subforum."+e}
                            content={forums[e]}
                            setMessage={setMessage}
                        />
                        <hr />
                        </>
                    )}
                </div>
                {Object.keys(message).length===0?<div>Seleccione un foro</div>:<div className="forum-messages">
                    <MainReply reply={{[Object.keys(message)[0]]:message[Object.keys(message)[0]]}} />
                    {
                        Object.keys(message).lenght<=1?
                        <Reply key reply={{"":"No hay respuestas"}} />:
                        Object.keys(message).slice(1).map((key)=>(
                            <Reply 
                                key
                                reply={{[key]:message[key]}}
                            />
                        ))
                    }
                    </div>
                }
            </div>
        </div>
    );
}

export default ForumScreen;
