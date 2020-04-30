async function initWorkout() {
  const lastWorkout = await API.getLastWorkout();
  console.log("Last workout:", lastWorkout);
  if (lastWorkout) {
    document
      .querySelector("a[href='/exercise?']")
      .setAttribute("href", `/exercise?id=${lastWorkout._id}`);

    lastWorkout.totalDuration = 0;

    lastWorkout.exercises.forEach((item) => {
      lastWorkout.totalDuration += item.duration;
    });

    const workoutSummary = {
      date: formatDate(lastWorkout.day),
      totalDuration: lastWorkout.totalDuration,
      numExercises: lastWorkout.exercises.length,
      ...tallyExercises(lastWorkout.exercises),
    };

    renderWorkoutSummary(workoutSummary);
  } else {
    renderNoWorkoutText();
  }
}

function tallyExercises(exercises) {
  const tallied = exercises.reduce((acc, curr) => {
    if (curr.type === "resistance") {
      acc.totalWeight = (acc.totalWeight || 0) + curr.weight;
      acc.totalSets = (acc.totalSets || 0) + curr.sets;
      acc.totalReps = (acc.totalReps || 0) + curr.reps;
    } else if (curr.type === "cardio") {
      acc.totalDistance = (acc.totalDistance || 0) + curr.distance;
    }
    return acc;
  }, {});
  return tallied;
}

function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(date).toLocaleDateString(options);
}

function renderWorkoutSummary(summary) {
  const container = document.querySelector(".workout-stats");

  const workoutKeyMap = {
    date: "Date;",
    numExercises: "Exercises Performed;",
    totalDuration: "Total Workout Duration;minutes;",
    totalWeight: "Total Weight Lifted;lbs",
    totalSets: "Total Sets Performed;",
    totalReps: "Total Reps Performed;",
    totalDistance: "Total Distance Covered;miles",
  };

  Object.keys(summary).forEach((key) => {
    const p = document.createElement("p");
    const strong = document.createElement("strong");

    strong.textContent = workoutKeyMap[key].split(`;`)[0];
    const textNode = document.createTextNode(`: ${summary[key]} ${workoutKeyMap[key].split(`;`)[1]}`);

    p.appendChild(strong);
    p.appendChild(textNode);

    container.appendChild(p);
  });
}

function renderNoWorkoutText() {
  const container = document.querySelector(".workout-stats");
  const p = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = "You have not created a workout yet!";

  p.appendChild(strong);
  container.appendChild(p);
}

initWorkout();
