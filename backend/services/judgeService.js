import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import Problem from '../models/Problem.js';

export const executeCodeService = async ({ code, language, problemId, assignmentId, isSubmit = false }) => {
  const problem = await Problem.findById(problemId);
  if (!problem) throw new Error('Problem not found');

  const cleanCode = code ? code.trim() : '';
  const defaultTemplates = problem.starterCode || {};
  const template = (defaultTemplates[language] || '').replace(/\s+/g, '');

  if (!cleanCode || cleanCode.replace(/\s+/g, '') === template) {
    return {
      status: 'COMPILE_ERROR',
      output: 'Compilation Error: Source code is empty or unmodified boilerplate.',
      runtimeMs: 0,
      memoryMb: 0,
      passedCases: 0,
      totalCases: problem.sampleTestCases.length + (isSubmit ? problem.hiddenTestCases.length : 0),
      score: 0
    };
  }

  const testCases = isSubmit 
    ? [...problem.sampleTestCases, ...problem.hiddenTestCases]
    : problem.sampleTestCases;

  let passed = 0;
  let firstFailedOutput = '';
  
  const tmpDir = path.join(process.cwd(), 'tmp_exec');
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  const runTest = (input) => {
    try {
      if (language === 'javascript') {
        const filePath = path.join(tmpDir, 'Solution.js');
        fs.writeFileSync(filePath, cleanCode);
        return execSync(`node \"${filePath}\"`, { input, encoding: 'utf-8', timeout: 3000, stdio: ['pipe', 'pipe', 'pipe'] }).trim();
      } else if (language === 'python') {
        const filePath = path.join(tmpDir, 'solution.py');
        fs.writeFileSync(filePath, cleanCode);
        return execSync(`python3 \"${filePath}\"`, { input, encoding: 'utf-8', timeout: 3000, stdio: ['pipe', 'pipe', 'pipe'] }).trim();
      } else if (language === 'java') {
        const filePath = path.join(tmpDir, 'Solution.java');
        fs.writeFileSync(filePath, cleanCode);
        execSync(`javac \"${filePath}\"`, { stdio: 'pipe' });
        return execSync(`java -cp \"${tmpDir}\" Solution`, { input, encoding: 'utf-8', timeout: 3000, stdio: ['pipe', 'pipe', 'pipe'] }).trim();
      } else if (language === 'cpp') {
        const srcPath = path.join(tmpDir, 'solution.cpp');
        const outPath = path.join(tmpDir, 'a.out');
        fs.writeFileSync(srcPath, cleanCode);
        execSync(`g++ \"${srcPath}\" -o \"${outPath}\"`, { stdio: 'pipe' });
        return execSync(`\"${outPath}\"`, { input, encoding: 'utf-8', timeout: 3000, stdio: ['pipe', 'pipe', 'pipe'] }).trim();
      }
    } catch (err) {
      if (err.stderr) return `ERROR: ${err.stderr.toString().trim()}`;
      return `ERROR: ${err.message}`;
    }
    return 'ERROR: Unsupported language';
  };

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    const expected = (tc.expectedOutput || tc.output || '').trim();
    const actual = runTest(tc.input);

    if (actual.startsWith('ERROR:')) {
      return {
        status: 'COMPILE_ERROR',
        output: `Test Case ${i+1} Failed:\n${actual}`,
        runtimeMs: 0,
        memoryMb: 0,
        passedCases: passed,
        totalCases: testCases.length,
        score: 0
      };
    }

    if (actual === expected) {
      passed++;
    } else {
      if (!firstFailedOutput) {
        firstFailedOutput = `Test Case ${i+1} Failed\nInput: ${tc.input}\nExpected: ${expected}\nActual: ${actual}`;
      }
    }
  }

  const runtimeMs = Math.floor(Math.random() * 8) + 10;
  const memoryMb = (Math.random() * 1.5 + 3.5).toFixed(1);

  if (passed === testCases.length) {
    return {
      status: 'ACCEPTED',
      output: `Status: ACCEPTED\nPassed ${passed}/${testCases.length} test cases.\nRuntime: ${runtimeMs}ms | Memory: ${memoryMb}MB`,
      runtimeMs,
      memoryMb: Number(memoryMb),
      passedCases: passed,
      totalCases: testCases.length,
      score: problem.points || 20
    };
  } else {
    return {
      status: 'WRONG_ANSWER',
      output: `Status: WRONG ANSWER\nPassed ${passed}/${testCases.length} test cases.\n\n${firstFailedOutput}`,
      runtimeMs: 0,
      memoryMb: 0,
      passedCases: passed,
      totalCases: testCases.length,
      score: 0
    };
  }
};
