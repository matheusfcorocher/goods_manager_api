const models = require("../../models/index.js");
const Pilots = models.Pilots;

const getAllPilotsHandler = async (req, reply) => {
    const pilots = await Pilots.findAll(); 
    reply.send(pilots);
}

const getPilotHandler = async (req, reply) => {
  const { pilotCertification } = req.params;
  
  const pilot = await Pilots.findAll({
    where: {
      pilotCertification: pilotCertification
    }
  });
  // const pilot = pilots.filter((pilot) => {
  //   return pilot.pilot_certification === pilot_certification;
  // })[0];

  if(Object.keys(pilot).length === 0) {
    return reply.status(404).send({
      errorMsg: 'Pilot not found',
    });
  }

  reply.send(pilot[0]);
}

const postPilotHandler = async (req, reply) => {
  const { pilotCertification, name, age, credits, locationPlanet } = req.body; 

  const pilot = await Pilots.findAll({
    where: {
      pilotCertification: pilotCertification
    }
  });
  // const pilot = pilots.filter((pilot) => {
  //   return pilot.pilot_certification === pilot_certification;
  // })[0];
  
  if(Object.keys(pilot).length === 1) {
    return reply.status(500).send({
      errorMsg: 'Pilot was already exist!',
    });
  }

  await Pilots.create({ pilotCertification, name, age, credits, locationPlanet });

  reply.send('Pilot added!');
};

const updatePilotHandler = async (req, reply) => {
  const { name, age, credits, locationPlanet } = req.body; 
  const { pilotCertification } = req.params;

  const pilot = await Pilots.findAll({
    where: {
      pilotCertification: pilotCertification
    }
  });

  if(Object.keys(pilot).length === 0) {
    return reply.status(404).send({
      errorMsg: 'Pilot not found!',
    });
  }

  await Pilots.update(
    { 
      name,
      age,
      credits,
      locationPlanet 
    }, {
    where: {
      pilotCertification: pilotCertification
    }
  });

  reply.send('Pilot updated!');
};

const deletePilotHandler = async (req, reply) => {
  const { pilotCertification } = req.params;

  const pilot = await Pilots.findAll({
    where: {
      pilotCertification: pilotCertification
    }
  });

  if(Object.keys(pilot).length === 0) {
    return reply.status(404).send(new Error("Pilot not found"));
  }
  
  await Pilots.destroy({
    where: {
      pilotCertification
    }
  });

  return reply.send('Pilot deleted!');
};

module.exports = { getAllPilotsHandler, getPilotHandler, postPilotHandler, updatePilotHandler, deletePilotHandler };