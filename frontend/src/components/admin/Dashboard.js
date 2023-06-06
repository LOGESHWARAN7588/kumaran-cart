import Sidebar from "./Sidebar";


export default function Dashboard () {
   

    return (
        <div className="row">
            <div className="col-12 col-md-2">
                    <Sidebar/>
            </div>
            <div className="col-12 col-md-10">
                <h1 className="my-4">Dashboard</h1>
              
               
            </div>
        </div>
    )
}