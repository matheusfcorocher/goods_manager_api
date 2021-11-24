const pilots = require("../../models/pilots");

const getAllPilotsHandler = (req, reply) => {
    reply.send(pilots);
}

const getPilotHandler = (req, reply) => {
  const { pilot_certification } = req.params;
  
  const pilot = pilots.filter((pilot) => {
    return pilot.pilot_certification === pilot_certification;
  })[0];

  if(!pilot) {
    return repply.status(404).send({
      errorMsg: 'Pilot not found',
    });
  }

  reply.send(pilot);
}

const postPilotHandler = (req, reply) => {
  const { pilot_certification, name, age, credits, location_planet } = req.body; 

  pilots.push({ pilot_certification, name, age, credits, location_planet });

  reply.send('Pilot added');
};

const updatePilotHandler = (req, reply) => {
  const { name, age, credits, location_planet } = req.body; 
  const { pilot_certification } = req.params;

  const pilot = pilots.filter((pilot) => {
    return pilot.pilot_certification === pilot_certification;
  })[0];

  if(!pilot) {
    return repply.status(404).send({
      errorMsg: 'Pilot not found',
    });
  }

  pilot.name = name;
  pilot.age = age;
  pilot.credits = credits;
  pilot.location_planet = location_planet;

  reply.send('Pilot updated');
};

const deletePilotHandler = (req, reply) => {
  const { pilot_certification } = req.params;

  const pilotIndex = pilots.findIndex((pilot) => {
    return pilot.pilot_certification === pilot_certification;
  });

  if (pilotIndex === -1) {
    return reply.status(404).send(new Error("Pilot not found"));
  }

  pilots.splice(pilotIndex, 1);

  return reply.send('Pilot deleted');
};

module.exports = { getAllPilotsHandler, getPilotHandler, postPilotHandler, updatePilotHandler, deletePilotHandler };