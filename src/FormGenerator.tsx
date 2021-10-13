import React, { Fragment, useEffect, useState } from "react"
import { FormServices } from "./config/Services"
import { IForm, TentacledChild } from "./models/IForm"


export default function FormGenerator() {
  const [axiosForm, setAxiosForm] = useState<TentacledChild[]>([])
  const [htmlForm,setHtmlForm] = useState<[]>([])
  const [userData,setUserData] = useState<{}>({})

  useEffect(() => {
    FormServices().then((res) => {
      const formData:IForm = res.data
      //console.log('res.data :>> ', res.data);

      const mapData = formData.forms[0].bilgiler.formjson.children[0].children[0].children[0].children;

      setAxiosForm(mapData);
        })

      let arrAxios:any = [];
    
      axiosForm.map((item,index) => {
        arrAxios.push(item);
        if(item.tag !== "legend"){
          //console.log(`item`, item)
          item.children?.map((item,index) => {
           // console.log(`item`, item)
            arrAxios.push(item);
            if(item.tag === "div"){
              //console.log(`item`, item)
            
              item?.children?.map((item,index) => {
                //console.log(`item`, item)
                arrAxios.push(item);
                if(item.tag === "label" || item.tag === "select"){              
                  item?.children?.map((item:any ,index:any) => {
                    arrAxios.push(item);
                  });
                }
                setHtmlForm(arrAxios);
              });
            }
          });
        }
    

    });


   
  }, [axiosForm])

  function userChange(e:any){
    //console.log('e.value.target :>> ', e.target.value);

  setUserData({
    ...userData,
    [e.target.value]: e.target.value,
  });
}

function formSubmit( e:any ){
  e.preventDefault();
  console.log('userData :>> ', userData);
}
 
  return (
    <>
    <form onSubmit={(e)=> formSubmit(e)}>
      <div className="row">
        <div className="col-4"></div>
        <div className="col-4">
          {htmlForm &&
            
            htmlForm.map((item:any, index:any) => {
              if(item.tag === "select"){
                return(
                  <Fragment key={index}>
                    {React.createElement(   
                      item.tag,
                   
                      {
                        className: item.class,
                        placeholder: item.placeholder,
                        name: item.name,
                        htmlFor:item.for,
                        value: item.value,
                        type: item.type,
                        key: index,
                        onChange: userChange,
                      },
                      item.children.map((item:any,index:any)=> {   
                        return React.createElement(
                          item.tag,
                   
                          {
                            className: item.class,
                            placeholder: item.placeholder,
                            name: item.name,
                            htmlFor:item.for,
                            value: item.value,
                            type: item.type,
                            key: index,
                            onChange: userChange,
                          },
                          item.html
                        );
                      })
                    )}
                  </Fragment>
                );
              } else{
                if(item.tag !== "select" && item.tag !== "option"){
                  return React.createElement(
                    item.tag,
                          {
                            className: item.class,
                            placeholder: item.placeholder,
                            name: item.name,
                            htmlFor:item.for,
                            value: item.value,
                            type: item.type,
                            key: index,
                            onChange: userChange,

                          },
                          item.html

                  );
                }
              }
            })
              }
        </div>
        <div className="col-4"></div>

      </div>

    </form>
       
    </>
  )
}
