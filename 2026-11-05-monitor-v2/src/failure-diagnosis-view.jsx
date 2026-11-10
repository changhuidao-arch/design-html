import React from 'react';
import { diagnoseFailure } from './failure-diagnosis.mjs';
export function FailureDiagnosis({ error }) {
  const diagnosis = diagnoseFailure(error);
  if (!diagnosis) return null;
  return <div className="mm-diagnosis"><strong>失败诊断：{diagnosis.title}</strong><p>{diagnosis.summary}</p><p>{diagnosis.steps}</p><details><summary>查看原始错误</summary><p className="mm-evidence">{error}</p></details></div>;
}
