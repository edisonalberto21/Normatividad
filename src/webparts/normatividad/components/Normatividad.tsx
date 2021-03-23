import * as React from 'react';
import './App.css'
import { INormatividadProps } from './INormatividadProps';
import pnp, {  } from "sp-pnp-js";
import { Items } from './Items';
import { INormatividadState } from './INormatividadState';

var validar = false;
export default class Normatividad extends React.Component<INormatividadProps,INormatividadState > {

  public miArray1 = []; 
  
  constructor(props: INormatividadProps, state: INormatividadState) {
    
    super(props);
    
    this.state = {
      Items: [],
      search: "",
      validacion:true                                                                 //Si inicializa el estado en el constructor con un array vacio
     };
   
     this.Memorandos(); 
                                                             //Método para hacer la consulta a la lista
     this.handleClick= this.handleClick.bind(this);   
     this.useEffect()                     
     
   }

  

    handleClick(e){          
                                               //Metodo para busqueda segun el item seleccionado
    var tipo;
    if(e != "Decretos"){
      tipo = e.target.id  
    }else{
      tipo = "Decretos"
     }
     this.miArray1= [];    
                                                    //Se inicializa el array para que la data no se duplique
                                                //Toma el atributo name seleccionado del input
    this.llenado(tipo);                                                     
   }

   useEffect(){
    setTimeout(() => {
      document.getElementById('Decretos').click();
     // document.getElementById('boton_busqueda').style.display = "none"
    }, 500);
   }

   

  public render(): React.ReactElement<INormatividadProps> {  //Inicio de render
    
   const items: JSX.Element[] = this.state.Items.map((item: Items, i: number): JSX.Element => {
      
      var newDate = item.Modified.split('T')[0];   //Configura la fecha a visualizar 
      var titulo =  item.Title ? item.Title : "";
       if(titulo.toLowerCase().indexOf(this.state.search.toLowerCase())!= -1){  
        document.getElementById('boton_busqueda').style.display = "none"
      return(
            <div className="col-12 mb-3" id="intel">
            <a href={item.FileRef} target="_blank"  title=""  className="sn-descargables-articulos-contenidos">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="39.646" height="39.066" viewBox="0 0 39.646 39.066">
                        <path d="M2552.531,2972.089a1.527,1.527,0,0,1,3.053,0v12.645l4.228-4.141a1.528,1.528,0,0,1,2.151,0,1.455,1.455,0,0,1,0,2.107l-6.83,6.7-.031.029h0a1.579,1.579,0,0,1-2.1,0h0l-.031-.029-.023-.029h0l-6.813-6.676a1.467,1.467,0,0,1,0-2.107,1.536,1.536,0,0,1,2.157,0l4.236,4.141v-12.645Zm14.02,26.04a1.5,1.5,0,1,1-1.52,1.488,1.508,1.508,0,0,1,1.52-1.488Zm-25.61,6.086a.907.907,0,0,1-.918-.9.917.917,0,0,1,.918-.9h26.226a.912.912,0,0,1,.918.9.9.9,0,0,1-.918.9Zm-2.791-11.568h31.808a3.973,3.973,0,0,1,2.776,1.122,3.776,3.776,0,0,1,1.144,2.71v9.358a3.781,3.781,0,0,1-1.144,2.711,3.978,3.978,0,0,1-2.776,1.12h-31.808a3.945,3.945,0,0,1-2.768-1.12,3.788,3.788,0,0,1-1.151-2.711v-9.358a3.783,3.783,0,0,1,1.151-2.71,3.94,3.94,0,0,1,2.768-1.122Zm31.808,2.978h-31.808a.921.921,0,0,0-.617.251.878.878,0,0,0-.247.6v9.358a.879.879,0,0,0,.247.6.923.923,0,0,0,.617.25h31.808a.888.888,0,0,0,.609-.25.822.822,0,0,0,.257-.6v-9.358a.822.822,0,0,0-.257-.6.887.887,0,0,0-.609-.251Z" transform="translate(-2534.23 -2970.602)"></path>
                    </svg>
                </span>
                <span>
                    <p>{item.Title}</p>
                    <p>{item.descripcion}. Fecha de actualización: {newDate}</p>
                </span>
            </a>
        </div>
      )
      }
    })
    
    return(
      <section className="my-5">
      <div className="container titulonorma">
          <div className="row no-gutters">
              <div className="col-12">
                  <div className="sn-intro-boletines">
                      <h5>{this.props.description}</h5>

                  </div>
              </div>

              <div className="col-md-6 col-12">
                  <div className="normatividad-search">
                      
                      <div className="input-group mb-3">
                          <input type="text" className="form-control" placeholder="Busca un documento" onChange={e => this.setState({ search:e.target.value })} aria-label="Busca un documento" aria-describedby="button-addon2"/>
                          <div className="input-group-append">
                            <button className="btn btn-outline-secondary"  type="button" onClick={this.Boton} id="button-addon2">Buscar</button>
                          </div>
                        </div>
                        <small role="alert" style={{display: "none"}} className="alert alert-warning" id="boton_busqueda" >No se encontraron resultados.</small>
                  </div>
              </div>

          </div>
 <div className="row no-gutters">
              <div className="col-12 tabs-normatividad">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                      <li className="nav-item" role="presentation">
                        <a className="nav-link active" id="Decretos" data-toggle="tab"  onClick={this.handleClick.bind(this)} role="tab" aria-controls="Decretos" aria-selected="true">Decretos</a>
                      </li>
                      <li className="nav-item" role="presentation">
                        <a className="nav-link" id="Resoluciones" data-toggle="tab" onClick={this.handleClick.bind(this)} role="tab" aria-controls="resoluciones" aria-selected="false">Resoluciones</a>
                      </li>
                      <li className="nav-item" role="presentation">
                        <a className="nav-link" id="Leyes" data-toggle="tab" onClick={this.handleClick.bind(this)} role="tab" aria-controls="leyes" aria-selected="false">Leyes</a>
                      </li>
                      <li className="nav-item" role="presentation">
                          <a className="nav-link" id="Circulares" data-toggle="tab" onClick={this.handleClick.bind(this)} role="tab" aria-controls="circulares" aria-selected="false">Circulares</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                      <div className="tab-pane fade show active" id="Decretos" role="tabpanel" aria-labelledby="Decretos-tab">
                          
                          <div className="row no-gutters">
                             {items}
                           </div>

                      </div>
                      
                    </div>
              </div>
          </div>
   </div>
  </section>
    );
  }

  Boton = ()=>{         //Redirige el evento del boton configurado desde las propiedades de la webpart
    event.preventDefault()
    if(!document.getElementById('intel')){
      document.getElementById('boton_busqueda').style.display = "block"
    }
   }  

  public miArray = [];  
  private Memorandos(): void {                                                      //Metodo para actualizar el estado con la consulta a la lista Eventos
     
    pnp.sp.web.lists.getByTitle(this.props.listName)
      .items.select('descripcion,Title,FileRef,FileDirRef,TipoDocumento,Modified').orderBy('Created', false).get()    //selecciona los items de la lista 
      .then((items: any[]): void => {
        this.miArray.push({
            Title: items
          
        });
        
        this.setState({
		     Items: items
         });
         
	}, (error: any): void => {        //Imprime si existe el error
      console.log(error);
       });

     
  }

  private llenado(itemc){                                                                                    //Recibe el state inicial y llena el array deneral miarray

  
    this.miArray.forEach((item, i: number) => {   //Recorre el primer elemeto del array
      
      item.Title.map((item1, index: number) => { 
           
           if(item1.TipoDocumento===itemc ){                                                    //Filra el array por el tem seleccionado en el boton de la vista
             
               this.miArray1.push({                                                              //Llena el array auxiliar
                   Title: item1.Title ?  item1.Title : "",
                   descripcion: item1.descripcion ,
                   TipoDocumento: item1.TipoDocumento ,
                   FileRef : item1.FileRef, 
                   Modified : item1.Modified
           
               }) ;
           }
       });
       this.setState({
           Items:this.miArray1                                                                        //Inicializa el estado con la nueva data
       });
   });
  
   }
  
}
