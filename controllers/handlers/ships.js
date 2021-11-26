const models = require("../../models/index.js");
const {Ships, Pilots} = models;

const getAllShipsHandler = async (req, reply) => {
    const ships = await Ships.findAll(); 
    reply.send(ships);
}

const getShipHandler = async (req, reply) => {
  const { pilotCertification } = req.params;
  
  const ship = await Ships.findAll({
    where: {
        pilotCertification: pilotCertification
    }
  });
  
  if(Object.keys(ship).length === 0) {
    return reply.status(404).send({
      errorMsg: `Ship not found with pilotCertification ${pilotCertification}`,
    });
  }

  reply.send(ship[0]);
}

const postShipHandler = async (req, reply) => {
  const { pilotCertification, fuelCapacity, fuelLevel, weightCapacity } = req.body; 
  
  const pilot = await Pilots.findAll({
    where: {
        pilotCertification: pilotCertification
    }
  });
  const ship = await Ships.findAll({
    where: {
        pilotCertification: pilotCertification
    }
  });
  

  if(Object.keys(pilot).length === 0) {
    return reply.status(500).send({
      errorMsg: `Pilot with pilotCertification ${pilotCertification} doesn't exist!'`,
    });
  }
  if(Object.keys(ship).length === 1) {
    return reply.status(500).send({
      errorMsg: `There's a ship with pilotCertification ${pilotCertification}!`,
    });
  }
  
  await Ships.create({ pilotCertification, fuelCapacity, fuelLevel, weightCapacity });

  reply.send('Ship added!');
};

const updateShipHandler = async (req, reply) => {
  const { fuelCapacity, fuelLevel, weightCapacity } = req.body; 
  const { pilotCertification } = req.params;

  const ship = await Ships.findAll({
    where: {
        pilotCertification: pilotCertification
    }
  });

  if(Object.keys(ship).length === 0) {
    return reply.status(404).send({
      errorMsg: 'Ship not found!',
    });
  }

  await Ships.update(
    { 
        fuelCapacity, fuelLevel, weightCapacity 
    }, {
    where: {
        pilotCertification
    }
  });

  reply.send('Ship updated!');
};

const refillShipHandler = async (req, reply) => {
  const { pilotCertification } = req.params;

  const ship = await Ships.findAll({
    where: {
        pilotCertification
    },
    raw:true,
  });

  const pilot = await Pilots.findAll({
    where: {
        pilotCertification
    },
    raw: true,
  });

  if(Object.keys(ship).length === 0 && Object.keys(pilot).length === 0) {
    return reply.status(404).send({
      errorMsg: 'Ship not found!',
    });
  }

  let { credits } = pilot[0];

  credits -= 7;

  await Pilots.update(
    { 
        credits 
    }, {
    where: {
        pilotCertification
    }
  });

  let {fuelCapacity, fuelLevel} = ship[0];
  fuelLevel = fuelCapacity;
   
  await Ships.update(
    { 
        fuelLevel
    }, {
    where: {
        pilotCertification
    }
  });

  reply.send('The fuel of the ship was refilled!');
};

const deleteShipHandler = async (req, reply) => {
  const { pilotCertification } = req.params;

  const ship = await Ships.findAll({
    where: {
        pilotCertification
    }
  });

  if(Object.keys(ship).length === 0) {
    return reply.status(404).send(new Error("Ship not found"));
  }
  
  await Ships.destroy({
    where: {
        pilotCertification
    }
  });

  return reply.send('Ship deleted!');
};

module.exports = { getAllShipsHandler, getShipHandler, postShipHandler, updateShipHandler, refillShipHandler, deleteShipHandler };