const faker = require('faker');

// import connection and models
const db = require('../config/connection');
const { User, Task, Assignment} = require('../models/index');

db.once('open', async() => {
  await Task.deleteMany({});
  await User.deleteMany({});
  await Assignment.deleteMany({})

  // create user data
  const userData = [];

  // create fake data for admin user
  for (let i = 0; i < 10; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();
    let admin = true

    // if i is divisible by 2, set to admin to false (child)
    if (i % 2 == 0){
      admin = false
    }
    const children = [];
    const tasks = [];

    // append to userData
    userData.push({ username, email, password, admin, children, tasks })
  } 

  // insert users to model
  await User.collection.insertMany(userData);

  // pull all children 
  childUsers = await User.find({ admin: false });
  parentUsers = await User.find({ admin: true })

  for (child in childUsers) {
    // append children to random 
    const randomUserIndex = Math.floor(Math.random() * parentUsers.length);
    const { _id: userId } = parentUsers[randomUserIndex];
    await User.updateOne({ _id: userId }, { $addToSet: { children: childUsers[child]._id}})
  }

  // create task data
  const taskData = [];

  for (let i = 0; i < 5; i += 1) {
    const name = faker.name.title();
    const category = faker.name.title();
    const value = faker.random.number({max: 10});

    // create random parent index (only parents can create new tasks)
    const randomUserIndex = Math.floor(Math.random() * parentUsers.length);
    const username = parentUsers[randomUserIndex].username;

    // push to taskData
    taskData.push({ name, category, value, username})
  }

  // insert to mongodb
  await Task.collection.insertMany(taskData);

  // create assignments
  const assignmentData = [];

  // query task data
  tasksUploaded = await Task.find({})

  for (let i = 0; i < 5; i += 1) {
    // create random child index
    const randomUserIndex = Math.floor(Math.random() * childUsers.length);
    const username = childUsers[randomUserIndex].username;

    // create random index for task
    const randomTaskIndex = Math.floor(Math.random() * tasksUploaded.length);
    const taskId = tasksUploaded[randomTaskIndex]._id;
    let completed = false;

    // task value
    const taskValue = tasksUploaded[randomTaskIndex].value;

    if (i % 2 == 0) {
      completed = true;
    }

    // append to container
    assignmentData.push({ username, taskId, taskValue, completed })
  }

  // insert to mongodb
  await Assignment.collection.insertMany(assignmentData);

  process.exit(0);
})
