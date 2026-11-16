"""Calcula um período da correção log 3-periódica H(w) do preprint
"Wirsching's Positive-Predecessor-Density Program: Proofs of Conjectures 1 and 3"
(arXiv:2608.27617), a partir da série de Fourier da Proposição sobre H:

    H(w) = sum_m Hhat(m) exp(i w_m w),   w_m = 2 pi m / c,   c = log 3
    Hhat(0) = log2/2 - log^2 2/(2c) - c/12 - A/c,   A = pi^2/12 - gamma_E^2/2 - gamma_1
    Hhat(m) = -(2^{i w_m}/c) Gamma(-i w_m) zeta(1 - i w_m),   m != 0

O resultado é conferido contra os valores publicados no preprint antes de ser gravado.
Uso:  python3 compute_H.py > ../data/computed/H.json     (requer mpmath)
"""
import json, sys
from mpmath import mp, mpf, mpc, log, pi, gamma, zeta, exp, euler, stieltjes, re, power

mp.dps = 40
c = log(3)
A = pi**2/12 - euler**2/2 - stieltjes(1)
H0hat = log(2)/2 - log(2)**2/(2*c) - c/12 - A/c

M = 12  # |Hhat(m)| decai como exp(-pi*w_m/2): m = 12 já está muito abaixo de 1e-40
coef = {}
for m in range(1, M+1):
    w = 2*pi*m/c
    coef[m] = -(power(2, mpc(0, w))/c) * gamma(mpc(0, -w)) * zeta(mpc(1, -w))

def H(x):
    s = H0hat
    for m, h in coef.items():
        w = 2*pi*m/c
        s += 2*re(h*exp(mpc(0, w*x)))   # Hhat(-m) = conj(Hhat(m)), H real
    return s

N = 240
xs = [c*k/N for k in range(N+1)]
ys = [H(x) for x in xs]
# extremos: grade grossa e depois refinamento local (a amostragem pura subestima a oscilação)
fine = [H(c*k/2000) for k in range(2001)]
def refine(k, sign):
    lo, hi = c*(k-1)/2000, c*(k+1)/2000
    for _ in range(6):
        pts = [lo + (hi-lo)*i/40 for i in range(41)]
        vals = [sign*H(p) for p in pts]
        j = max(range(41), key=vals.__getitem__)
        lo, hi = pts[max(j-1, 0)], pts[min(j+1, 40)]
    return H((lo+hi)/2)
kmax = max(range(2001), key=fine.__getitem__); kmin = min(range(2001), key=fine.__getitem__)
osc = refine(kmax, 1) - refine(kmin, -1)
checks = {
  "exp_H0": float(exp(H(0))),
  "H0_minus_Hlog3over2": float(H(0) - H(log(mpf(3)/2))),
  "osc": float(osc),
}
# valores publicados (resumo do arXiv e certificado do preprint)
assert mpf("0.53412203666478") < exp(H(0)) < mpf("0.53412203666479"), checks
assert mpf("-0.000377190280943987") < H(0) - H(log(mpf(3)/2)) < mpf("-0.000377190280943985"), checks
assert mpf("4.1874494771e-4") <= osc <= mpf("4.187981e-4"), checks
json.dump({
  "period": float(c), "mean": float(H0hat), "abs_Hhat1": float(abs(coef[1])), "abs_Hhat2": float(abs(coef[2])),
  "checks": checks,
  "w": [round(float(x), 8) for x in xs],
  "H_minus_mean": [float(y - H0hat) for y in ys],
}, sys.stdout)
