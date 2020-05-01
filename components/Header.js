//Importar librerías y variables
import React from "react";
import {Menu} from "semantic-ui-react";
import {Link} from "../routes";

//Exportar variable
export default () => {
  return (
    <Menu style={{marginTop: "10px"}}>
        <Link route="/">
          <a className="item">
            MoreChain
          </a>
        </Link>
      <Menu.Menu position = "right">
        <Link route="/">
          <a className="item">
            Proyectos
          </a>
        </Link>

        <Link route="/campaigns/new">
          <a className="item">
            +
          </a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
}
