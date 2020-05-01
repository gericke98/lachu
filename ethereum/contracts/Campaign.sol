pragma solidity ^0.4.17;

contract CampaignFactory{
    address[] public deployedCampaigns; //Array que recoge todos los eventos

    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender); //Address que recoge cada contrato de un nuevo evento
        deployedCampaigns.push(newCampaign); // Añade el nuevo evento al array
    }

    function getDeployedCampaign() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {

//Creación de una estructura
    struct Request {
        string description; //Descripcion de la propuesta
        uint value; //Coste de la propuesta
        address recipient; //Dirección o empresa a la que se le va a pagar
        bool complete; //Variable que dice si se ha completado la propuesta o no
        uint approvalCount; //Variable que recoge el número de usuarios que han aprobado la propuesya
        mapping(address => bool) approvals;
    }

//Declaración de variables
    Request[] public requests; //Array de estructuras que recoge toda la información necesaria de una campaña
    address public manager; //Variable que recoge la direccion o "identidad" del creador de la campaña
    uint public minimumContribution; //Variable que establece la inversión mínima del proyecto
    mapping(address => bool) public approvers; //Variable que recoge quien aprueba y quien no
    uint public approversCount; //Variable que recoge el número de inversores de cada campaña


//Modifier es una "Función corta" que requiere ser el creador de la campaña al llamar a otra función
    modifier restricted () {
        require (msg.sender == manager);
        _;
    }

//Declaración de funciones
//Declaracion de funcion padre (es la primera que se ejecuta al llamar al contrato)
    function Campaign(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }

//Función para contribuir o invertir en el proyecto
    function contribute () public payable {
        require(msg.value > minimumContribution); //Obliga a que la inversión sea mayor que el mínimo

        approvers[msg.sender] = true; //Añade al inversor al mapping de inversores
        approversCount++; //Incrementa el número total de inversores del proyecto
    }

//Función para crear una propuesta de gasto (Necesitas ser el creador del proyecto para llamar a la funcion)
    function createRequest (string description, uint value, address recipient) public restricted {
      //Crea una nueva estructura con los datos introducidos
        Request memory newRequest = Request ({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });
      //Añade la propuesta de gasto al array de propuestas
        requests.push(newRequest);
    }

//Función para aprovar una propuesta de gasto
    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest (uint index) public restricted  {
        Request storage request = requests[index];
        require(!request.complete);
        require(request.approvalCount > (approversCount / 2));

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns (uint, uint, uint, uint, address){
      return (
        minimumContribution,
        this.balance,
        requests.length,
        approversCount,
        manager
      );
    }

    function getRequestsCount() public view returns (uint) {
      return requests.length;
    }





}
