const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askTask(question) {
  return new Promise((resolve) => {
    rl.question(`${question} (y/n): `, (answer) => {
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

async function runTasks() {
  console.log('🚀 Portfolio Task Manager\n');
  
  const tasks = [
    { name: 'Task 4.1: Performance Optimization (8 min)', question: 'Start performance optimization?' },
    { name: 'Task 4.2: Content Polish (7 min)', question: 'Start content polish?' }
  ];
  
  for (const task of tasks) {
    console.log(`\n📋 ${task.name}`);
    const proceed = await askTask(task.question);
    
    if (proceed) {
      console.log('✅ Starting task...');
      // Task logic would go here
    } else {
      console.log('⏭️  Skipping task');
    }
  }
  
  rl.close();
}

runTasks();

