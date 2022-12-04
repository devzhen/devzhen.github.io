import React from 'react';

import { SEARCH_STRATEGY } from "../constants";

type StrategySelectProps = {
  value: string | undefined,
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
}

const StrategySelect = (props: StrategySelectProps) => {
  const { value, onChange } = props;

  return (
    <select onChange={onChange} value={value}>
      {Object.values(SEARCH_STRATEGY).map(item => (
        <option key={item} value={item}>{item}</option>
      ))}
    </select>
  )
}

export default StrategySelect
