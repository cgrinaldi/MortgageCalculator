export const MI_PREM_035 = 0.0085;
export const MI_PREM_10 = 0.004;

export const PRODUCT_035 = {
  name: '3.5% Down + MI',
  downpaymentFraction: 0.035,
  MIPrem: MI_PREM_035
};

export const PRODUCT_10 = {
  name: '10% Down + MI',
  downpaymentFraction: 0.1,
  MIPrem: MI_PREM_10
};

export const PRODUCT_20 = {
  name: '20% Down',
  downpaymentFraction: 0.2,
  MIPrem: 0
};

export const PRODUCT_REX = {
  name: '10% Down + REX',
  isREX: true,
  downpaymentFraction: 0.1,
  MIPrem: 0
};
