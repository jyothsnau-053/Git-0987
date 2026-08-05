\# Google Apps Usage Among Students — SPSS Analysis



\## Overview

This repository contains the statistical analysis of a survey examining how students across different academic streams and years of study use, perceive, and rely on Google applications (Search, Drive, Docs, Classroom, Gmail, Meet, and related tools) for academic work.



The survey was administered to \*\*100 respondents\*\* across four academic streams (BSc, Bcom, BA, BBA) and three years of study (I, II, III Year). Analysis covers usage frequency, perceived effectiveness, satisfaction, tool awareness, and willingness to recommend Google apps for educational use.



\## Repository Structure

├── README.md

├── analysis\_syntax.sps

├── output/

│ ├── 01\_demographic\_profile.pdf

│ ├── 02\_device\_access.pdf

│ ├── 03\_satisfaction\_effectiveness.pdf

│ ├── 04\_usage\_habits.pdf

│ ├── 05\_app\_usage\.pdf

│ ├── 06\_tool\_awareness\.pdf

│ ├── 07\_exploration\_motivation.pdf

│ ├── 08\_career\_initiatives.pdf

│ └── 09\_recommendation\_rating.pdf

└── docs/

├── questionnaire.md

└── codebook.md





\## How to Navigate This Repository



\- \*\*`analysis\_syntax.sps`\*\* — the complete SPSS syntax used to generate all analyses, organized into 9 labeled sections corresponding to the output files below.

\- \*\*`output/`\*\* — the results of each analysis section as PDF, numbered to match the syntax sections.

\- \*\*`docs/questionnaire.md`\*\* — the full list of survey questions and their response options.

\- \*\*`docs/codebook.md`\*\* — variable names, labels, and value codes as defined in the original SPSS data file.



\## Analysis Breakdown



| # | File | Questions Covered | Focus |

|---|---|---|---|

| 1 | Demographic Profile | Year, Stream | Sample composition |

| 2 | Device Usage \& Access Experience | Q1–Q4 | Access, ease of use, security, trust |

| 3 | Importance, Effectiveness \& Satisfaction | Q5, Q12, Q14, Q16, Q17 | Core outcome measures, ANOVA, correlation, regression |

| 4 | Usage Habits | Q9, Q11, Q13, Q22 | Purpose of use, collaboration, productivity |

| 5 | App Usage Frequency Battery | Q18.1–Q18.8 | Frequency of use across 8 individual Google apps |

| 6 | Tool Awareness Battery | Q19.1–Q19.8 | Awareness of lesser-known Google tools, analyzed item by item |

| 7 | Exploration \& Motivating Factors | Q21, Q23 | Feature exploration behavior and drivers of use |

| 8 | Career Initiatives Awareness | Q26.1–Q26.4, Q27 | Awareness of Google's career/learning programs, analyzed item by item |

| 9 | Recommendation \& Overall Rating | Q28, Q30 | Willingness to recommend, overall usability |



\## Methodology Notes



\- \*\*Statistical tests used:\*\* Frequencies, Chi-square (crosstabs), One-Way ANOVA with Tukey post-hoc, Levene's test for homogeneity of variance, Pearson and Spearman correlation, Multiple Linear Regression, Cronbach's Alpha (reliability).

\- \*\*Composite variables:\*\* A usage composite (`UsageIndex`, mean of Q18.1–Q18.8) was constructed and validated via Cronbach's Alpha (α ≈ 0.70) before use in correlation and regression analyses. A career-initiatives composite was attempted but not included in the final analysis, as the computation could not be completed reliably — the relevant items (Q26.1–Q26.4) are reported individually in File 8 instead. Tool-awareness items (Q19.1–Q19.8) are likewise reported individually in File 6, without a combined score.

\- \*\*Sample limitation:\*\* The BSc stream has a very small sample size (N=3) relative to the other streams (Bcom N=47, BA N=9, BBA N=41). Any Stream-based comparisons involving BSc should be interpreted with caution due to low statistical power and wide confidence intervals.

\- \*\*Software:\*\* IBM SPSS Statistics.



\## Key Findings

\*(To be added once interpretation is finalized for each file)\*



\## Data Source

Survey data collected via Google Forms; n = 100 valid responses, no missing data across analyzed variables.

