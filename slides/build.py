# Builds the four portfolio slides as 1600x900 HTML pages in a clean,
# guide-style look (Manrope/Inter, label tables, stat tiles, numbered steps).
import os, base64

OUT = os.path.dirname(os.path.abspath(__file__))

CSS = """
:root { --accent:#1d5bd6; --accent-soft:#e8effc; --gold:#b8892a; --gold-soft:#fbf3e2;
        --ink:#141a26; --muted:#4a5263; --rule:#e3e7ef; --zebra:#f6f8fb; }
* { box-sizing:border-box; margin:0; padding:0; }
html, body { width:1600px; height:800px; }
body { background:#fff; color:var(--ink); font:400 19px/1.45 Inter, sans-serif;
       padding:64px 72px 0; position:relative; overflow:hidden; }
body::before { content:''; position:absolute; left:0; top:0; bottom:0; width:10px; background:var(--accent); }
.eyebrow { font:700 14px Manrope, sans-serif; letter-spacing:.16em; text-transform:uppercase; color:var(--accent); }
h1 { font:800 46px/1.1 Manrope, sans-serif; letter-spacing:-.02em; margin:10px 0 8px; }
.sub { color:var(--muted); font-size:20px; max-width:1150px; }
.foot { position:absolute; left:72px; right:72px; bottom:30px; display:flex; justify-content:space-between;
        font-size:14px; color:var(--muted); border-top:1px solid var(--rule); padding-top:12px; }
.foot b { color:var(--accent); font-weight:600; }
.label { font:700 13px Manrope, sans-serif; letter-spacing:.14em; text-transform:uppercase; color:var(--muted); white-space:nowrap; }
.tiles { display:grid; gap:16px; }
.tile { border:1px solid var(--rule); border-radius:14px; padding:18px 20px; }
.tile .n { font:800 40px/1 Manrope, sans-serif; letter-spacing:-.02em; color:var(--accent); font-variant-numeric:tabular-nums; }
.tile .c { font-size:15px; color:var(--muted); margin-top:8px; line-height:1.35; }
.tile.key { background:var(--accent); border-color:var(--accent); }
.tile.key .n, .tile.key .c { color:#fff; }
.callout { background:var(--gold-soft); border-radius:14px; padding:16px 20px; }
.callout .t { font:700 13px Manrope, sans-serif; letter-spacing:.14em; text-transform:uppercase; color:var(--gold); margin-bottom:6px; }
.callout p { font-size:16px; color:#3b3323; }
.num { flex:none; width:38px; height:38px; border-radius:50%; background:var(--accent); color:#fff;
       display:grid; place-items:center; font:800 17px Manrope, sans-serif; }
.step { display:flex; gap:14px; align-items:flex-start; }
.step h3 { font:700 19px Manrope, sans-serif; margin-top:6px; }
.step p { font-size:15.5px; color:var(--muted); margin-top:2px; }
"""

def page(name, eyebrow, title, sub, body, project):
    html = f"""<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=block" rel="stylesheet">
<style>{CSS}</style></head><body>
<p class="eyebrow">{eyebrow}</p><h1>{title}</h1><p class="sub">{sub}</p>
{body}
<div class="foot"><span>Meet Patel · Portfolio</span><b>{project}</b></div>
</body></html>"""
    open(os.path.join(OUT, name + '.html'), 'w', encoding='utf-8').write(html)


# ---------- 1. Common Data Layer ----------
def img(name):
    data = open(os.path.join(OUT, 'coffee', name + '.png'), 'rb').read()
    return 'data:image/png;base64,' + base64.b64encode(data).decode()

# Coffee metaphor from the original deck: beans → ground → brewed.
levels = [
    ('L0', 'Raw', 'Copies supply chain transactional data, unchanged, into one central repository. Usable directly for data science.', 'beans', 'Raw beans'),
    ('L1', 'Conformed', 'One consolidated view: simplifies complex structures, harmonizes descriptions and creates a common vocabulary for metrics.', 'ground', 'Usable by all; just add water'),
    ('L2', 'Use-Case Specific', 'Refines and filters L0 and L1 data for reporting, data science projects and AI models.', 'cup', 'Ready to consume'),
]
cards = ''.join(f"""
<div class="lvl"><figure><img src="{img(pic)}" alt=""><figcaption>{cap}</figcaption></figure>
<div class="lvl-h"><span class="num">{c}</span><div><h3>{t}</h3><span class="label">Level {i}</span></div></div>
<p>{d}</p></div>{'<div class="arrow">→</div>' if i < 2 else ''}""" for i, (c, t, d, pic, cap) in enumerate(levels))
page('cdl-architecture', 'Johnson & Johnson · Supply Chain',
     'How the Common Data Layer Works',
     'A single source of truth for supply chain data, built on FAIR principles: findable, accessible, interoperable and reusable.',
     f"""<style>
.flow {{ display:flex; align-items:stretch; gap:14px; margin-top:28px; }}
.lvl {{ flex:1; border:1px solid var(--rule); border-radius:16px; padding:22px 24px 22px; background:linear-gradient(180deg,var(--accent-soft),#fff 60%); }}
.lvl-h {{ display:flex; gap:14px; align-items:center; margin-bottom:10px; }}
.lvl-h h3 {{ font:800 24px Manrope, sans-serif; }}
.lvl figure {{ display:flex; flex-direction:column; align-items:center; margin:0 0 14px; padding-bottom:12px; border-bottom:1px solid var(--rule); }}
.lvl figure img {{ width:84px; height:84px; border-radius:50%; object-fit:cover; display:block; margin:0 auto;
             box-shadow:0 6px 18px rgba(20,26,38,.12); background:#fff; }}
.lvl figure figcaption {{ font:600 12.5px Inter; color:var(--gold); margin-top:6px; white-space:nowrap; font-style:italic; text-align:center; }}
.lvl p {{ font-size:16.5px; color:var(--muted); }}
.arrow {{ align-self:center; font:800 30px Manrope; color:var(--accent); }}
.row {{ display:flex; align-items:stretch; gap:14px; margin-top:20px; }}
.row > .tile, .row > .callout {{ flex:1 1 0; min-width:0; height:150px; padding:18px 22px; display:flex; flex-direction:column; justify-content:center; }}
.row .spacer {{ visibility:hidden; }}
.multi {{ display:flex; justify-content:space-between; gap:12px; }}
.multi > div {{ flex:1; }}
.multi > div + div {{ border-left:1px solid var(--rule); padding-left:14px; }}
.tile.key .multi > div + div {{ border-left-color:rgba(255,255,255,.3); }}
.multi .n {{ font-size:34px; }}
.multi .c {{ font-size:14px; }}
</style>
<div class="flow">{cards}</div>
<div class="row tiles">
  <div class="tile"><div class="multi">
    <div><div class="n">230+</div><div class="c">Source apps, up from 170</div></div>
    <div><div class="n">23,500</div><div class="c">Tables after CAR3</div></div>
    <div><div class="n">115</div><div class="c">Apps in CAR3 scope</div></div>
  </div></div>
  <div class="arrow spacer">→</div>
  <div class="callout"><div class="t">Why It Matters</div><p>Teams stop paying to ingest the same data again. Data is ready on day one, cutting weeks or months off every analytics project.</p></div>
  <div class="arrow spacer">→</div>
  <div class="tile key"><div class="multi">
    <div><div class="n">32%</div><div class="c">Return on Azure (IRR)</div></div>
    <div><div class="n">$1.1M</div><div class="c">Net present value</div></div>
  </div></div>
</div>""", 'Supply Chain Common Data Layer')


# ---------- 2. Federal accounts remediation ----------
weeks = [(1, 104, 70), (2, 369, 249), (3, 418, 300), (4, 571, 424), (5, 423, 356), (6, 507, 401), (7, 154, 93), (8, 0, 1)]
mx = 600
bars = ''.join(f"""<div class="wk"><div class="bars">
<div class="b d" style="height:{d / mx * 100:.1f}%"><span>{d or ''}</span></div>
<div class="b r" style="height:{max(r / mx * 100, .6):.1f}%"><span>{r}</span></div></div><div class="wl">Week {w}</div></div>""" for w, d, r in weeks)
steps = [
    ('Diagnose', 'Pull account details from three internal systems (ACSR, Café, Workbench).'),
    ('Route', 'Assign each account to a remediation bucket with decision-tree logic.'),
    ('Remediate & Verify', 'Fix it directly, or confirm the owner did, so every account meets audit criteria.'),
]
steps_html = ''.join(f'<div class="step"><span class="num">{i}</span><div><h3>{t}</h3><p>{d}</p></div></div>' for i, (t, d) in enumerate(steps, 1))
page('remediation-progress', 'Comcast · Federal Accounts',
     'Clearing a Federal Audit Backlog in 8 Weeks',
     'An audit flagged 5,200+ federal accounts and only a third were fixed. I led a junior analyst team through a repeatable three-step process.',
     f"""<style>
.grid {{ display:grid; grid-template-columns:1.55fr 1fr; gap:44px; margin-top:30px; }}
.chart {{ border:1px solid var(--rule); border-radius:16px; padding:18px 22px 14px; }}
.chart-h {{ display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }}
.legend {{ display:flex; gap:18px; font-size:14px; color:var(--muted); }}
.legend i {{ display:inline-block; width:12px; height:12px; border-radius:3px; margin-right:6px; vertical-align:-1px; }}
.plot {{ display:flex; gap:14px; height:300px; align-items:flex-end; border-bottom:2px solid var(--ink); padding-top:20px; }}
.wk {{ flex:1; height:100%; display:flex; flex-direction:column; }}
.bars {{ flex:1; display:flex; gap:5px; align-items:flex-end; }}
.b {{ flex:1; border-radius:6px 6px 0 0; position:relative; }}
.b span {{ position:absolute; top:-21px; left:50%; transform:translateX(-50%); font:600 12.5px Inter; color:var(--muted); font-variant-numeric:tabular-nums; }}
.b.d {{ background:#b9cdf3; }} .b.r {{ background:var(--accent); }}
.wl {{ font-size:13px; color:var(--muted); text-align:center; margin-top:8px; white-space:nowrap; }}
.side {{ display:flex; flex-direction:column; gap:22px; }}
.tiles2 {{ grid-template-columns:1fr 1fr; }}
</style>
<div class="grid">
  <div class="chart">
    <div class="chart-h"><span class="label">Accounts Worked per Week</span>
      <div class="legend"><span><i style="background:#b9cdf3"></i>Diagnosed</span><span><i style="background:var(--accent)"></i>Remediated</span></div></div>
    <div class="plot">{bars}</div>
  </div>
  <div class="side">
    {steps_html}
    <div class="tiles tiles2">
      <div class="tile key"><div class="n">1,894</div><div class="c">Accounts our team remediated directly</div></div>
      <div class="tile"><div class="n">0</div><div class="c">Accounts left undiagnosed at close, June 21</div></div>
    </div>
  </div>
</div>""", 'Federal Accounts Audit Remediation')


# ---------- 3. Delivery reliability ----------
tiers = [
    ('Manual', 'Dropdowns for anything left over', '#c9a24a'),
    ('Overconsumption', 'Calculated with a formula', '#3f74de'),
    ('MTO', 'Made-to-order, flagged from the PA tool', '#2f66d4'),
    ('Region Reason Codes', 'EMEA and APAC codes from the PA tool', '#2458c4'),
    ('STEM', 'Active issues matched to each miss', '#1b4bb0'),
    ('OTIF-D Misses', 'Every late or incomplete delivery', '#123a8f'),
]
# An inverted pyramid (funnel): volume shrinks at each tier, from every miss
# at the top to the few left for manual tagging. Each tier is a trapezoid slice.
# Rows share the column height equally, so slopes are computed on fractions.
TOP, PW, N = 0.24, 400, len(tiers)
def inset(f):
    return (1 - (TOP + (1 - TOP) * f)) / 2 * 100
rows = []
for i, (t, d, c) in enumerate(reversed(tiers)):
    a_, b_ = inset(1 - i / N), inset(1 - (i + 1) / N)
    mid = inset(1 - (i + 0.5) / N)
    clip = f"polygon({a_:.2f}% 0,{100 - a_:.2f}% 0,{100 - b_:.2f}% 100%,{b_:.2f}% 100%)"
    lead_left = PW * (100 - mid) / 100 + 8
    rows.append(f'<div class="prow"><div class="tier" style="background:{c};clip-path:{clip}"><b>{t}</b></div>'
                f'<span class="leader" style="left:{lead_left:.0f}px;width:{PW + 18 - lead_left:.0f}px"></span>'
                f'<div class="tdesc">{d}</div></div>')
pyr = ''.join(rows)
runs = [('Sun 10:30 PM', 'Download OTIF-D Misses', 'From the PA tool'),
        ('Mon 12:30 AM', 'Apply STEM', 'Match misses to active issues'),
        ('Mon 2:30 AM', 'Add Business Rules', 'MTO, region codes, overconsumption'),
        ('Mon 5:30 AM', 'Upload', 'Back to the PA tool via MBOX'),
        ('Mon 11:00 AM', 'Send for Review', 'Leftovers get dropdowns for manual tagging')]
tl = ''.join(f'<div class="run"><span class="when">{w}</span><span class="dot"></span><div><h3>{t}</h3><p>{d}</p></div></div>' for w, t, d in runs)
page('failure-modes', 'Ethicon',
     'Tagging Every Late Delivery With a Root Cause',
     'Automated logic tags most OTIF-D misses before Monday morning, so only the leftovers need a manual call.',
     f"""<style>
.grid {{ display:grid; grid-template-columns:1.1fr 1fr; gap:56px; margin-top:28px; align-items:stretch; }}
.left {{ display:flex; flex-direction:column; }}
.head {{ display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; }}
.pyr {{ flex:1; display:flex; flex-direction:column; gap:4px; }}
.prow {{ flex:1; position:relative; display:grid; grid-template-columns:{PW}px 1fr; column-gap:26px; align-items:center; }}
.tier {{ height:100%; color:#fff; display:grid; place-items:center; }}
.tier b {{ font:800 15px Manrope, sans-serif; white-space:nowrap; }}
.leader {{ position:absolute; top:50%; border-top:1.5px dotted #b9c3d6; }}
.tdesc {{ font-size:15px; color:var(--ink); line-height:1.3; }}
.keys {{ display:flex; gap:18px; font-size:13px; color:var(--muted); white-space:nowrap; }}
.keys i {{ display:inline-block; width:11px; height:11px; margin-right:6px; vertical-align:-1px; }}
.tl {{ position:relative; display:flex; flex-direction:column; gap:9px; }}
.tl::before {{ content:''; position:absolute; left:139px; top:12px; bottom:12px; width:2px; background:var(--rule); }}
.run {{ display:grid; grid-template-columns:118px 42px 1fr; align-items:start; }}
.when {{ font:700 15px Manrope, sans-serif; color:var(--accent); white-space:nowrap; padding-top:3px; }}
.dot {{ width:14px; height:14px; border-radius:50%; background:#fff; border:3px solid var(--accent); margin:5px 0 0 15px; position:relative; z-index:1; }}
.run h3 {{ font:700 18px Manrope, sans-serif; }}
.run p {{ font-size:15px; color:var(--muted); }}
.multi {{ display:flex; gap:12px; }}
.multi > div {{ flex:1; }}
.multi > div + div {{ border-left:1px solid rgba(255,255,255,.3); padding-left:18px; }}
.multi .c {{ font-size:14px; }}
.right .tile.key {{ margin-top:20px; padding:20px 24px; }}
.right .multi .n {{ font-size:36px; }}
</style>
<div class="grid">
  <div class="left">
    <div class="head">
      <div class="keys"><span><i style="background:#1b4bb0"></i>Automated logic</span><span><i style="background:#c9a24a"></i>Manual</span></div></div>
    <div class="pyr">{pyr}</div>
  </div>
  <div class="right"><div class="head"><p class="label">Weekly Run, Before the Monday Refresh</p></div><div class="tl">{tl}</div>
    <div class="tile key"><div class="multi">
      <div><div class="n">30+ hrs</div><div class="c">Saved every week by the STEM tool</div></div>
      <div><div class="n">5.5 → 3.5</div><div class="c">Hours per weekly run, initial vs long term</div></div>
    </div></div>
  </div>
</div>""", 'Delivery Reliability Failure-Mode Automation')


# ---------- 4. PMO toolkit: stage-gate tracker ----------
stages = [
    ('Planning', 'Stage 1', [('Project Charter', 'Complete'), ('Requirements', 'Complete'), ('Budget Approval', 'In Progress'), ('Resource Plan', 'In Progress'), ('Risk Register', 'In Progress')]),
    ('Development', 'Stage 2', [('Solution Design', 'In Progress'), ('Build', 'In Progress'), ('Integrations', 'Not Started'), ('Data Migration', 'Not Started')]),
    ('Validation', 'Stage 3', [('Test Plan', 'Not Started'), ('UAT', 'Not Started'), ('Sign-Off', 'Not Started')]),
    ('Implementation', 'Stage 4', [('Training', 'In Progress'), ('Go-Live', 'Not Started'), ('Hypercare', 'Not Started')]),
]
cls = {'Complete': 'ok', 'In Progress': 'go', 'Not Started': 'no'}
cols = ''
for name, st, items in stages:
    counts = {k: sum(1 for _, s in items if s == k) for k in cls}
    rows = ''.join(f'<li><span>{t}</span><em class="{cls[s]}">{s}</em></li>' for t, s in items)
    roll = ''.join(f'<div><b class="{cls[k]}">{v}</b>{k}</div>' for k, v in counts.items())
    cols += f'<div class="stage"><div class="st-h"><span class="label">{st}</span><h3>{name}</h3></div><ul>{rows}</ul><div class="roll">{roll}</div></div>'
page('pmo-stage-gates', 'PMO Toolkit · Reusable Templates',
     'Stage-Gate Tracker',
     'One view of every deliverable across the four stages, with status rolled up per stage, so leaders can compare programs at a glance.',
     f"""<style>
.stages {{ display:grid; grid-template-columns:repeat(4,1fr); gap:18px; margin-top:28px; }}
.stage {{ border:1px solid var(--rule); border-radius:16px; overflow:hidden; display:flex; flex-direction:column; }}
.st-h {{ background:var(--accent-soft); padding:14px 18px; border-bottom:1px solid var(--rule); }}
.st-h h3 {{ font:800 22px Manrope, sans-serif; margin-top:2px; }}
.stage ul {{ list-style:none; padding:6px 18px; flex:1; }}
.stage li {{ display:flex; justify-content:space-between; align-items:center; gap:10px; padding:9px 0; border-bottom:1px solid var(--rule); font-size:16px; }}
.stage li:last-child {{ border-bottom:0; }}
em {{ font:600 12.5px Inter; font-style:normal; padding:4px 10px; border-radius:999px; white-space:nowrap; }}
.ok {{ background:#dcecff; color:#1d4fb8; }} .go {{ background:#fbefd5; color:#8a6418; }} .no {{ background:#eef0f4; color:#5b6372; }}
.roll {{ display:grid; grid-template-columns:repeat(3,1fr); border-top:1px solid var(--rule); background:var(--zebra); }}
.roll div {{ padding:10px 6px; text-align:center; font-size:12.5px; color:var(--muted); white-space:nowrap; }}
.roll b {{ display:block; font:800 22px Manrope, sans-serif; background:none; }}
.roll b.ok {{ color:#1d4fb8; }} .roll b.go {{ color:#a87a1c; }} .roll b.no {{ color:#7a8191; }}
.kit {{ display:flex; gap:12px; align-items:center; margin-top:22px; }}
.kit span {{ border:1px solid var(--rule); border-radius:999px; padding:6px 14px; font-size:14.5px; color:var(--muted); white-space:nowrap; }}
</style>
<div class="stages">{cols}</div>
<div class="kit"><span class="label" style="border:0;padding:0;color:var(--gold)">Also in the Kit</span><span>Roadmaps</span><span>Timelines</span><span>Status Reports</span><span>Risk Register</span><span>Milestone Trackers</span><span style="margin-left:auto;border:0;font-style:italic">Template shown with sample items</span></div>
""", 'PMO Toolkit')
# ---------- 5. The Two-Flex Board (fantasy draft tool) ----------
shot = 'data:image/png;base64,' + base64.b64encode(open(os.path.join(OUT, 'draft', 'board-shot.png'), 'rb').read()).decode()
how = [
    ('Rank vs. the room', 'Every player gets my own board rank next to ADP. The gap shows who lasts longer than he is worth (green) and who the room overpays for (red).'),
    ('Rules, not vibes', 'Seven position-timing rules turn the board into decisions: when to take a TE, when to stop waiting on RBs, defense last.'),
    ('Live during the draft', 'Click a name to mark him gone, + to roster him. The board, roster counts and next-pick advice update as the draft moves.'),
]
steps = ''.join(f'<div class="step"><div class="num">{i}</div><div><h3>{t}</h3><p>{d}</p></div></div>' for i, (t, d) in enumerate(how, 1))
page('draft-board', 'Side Project · Built with Claude',
     'The Two-Flex Board',
     'A fantasy football draft tool for a 12-team, two-flex league: my rankings, the room’s ADP and a game plan on one screen.',
     f"""<style>
.grid {{ display:grid; grid-template-columns:820px 1fr; gap:48px; margin-top:26px; }}
.frame {{ border:1px solid var(--rule); border-radius:14px; overflow:hidden; height:500px; box-shadow:0 18px 40px -24px rgba(20,26,38,.35); }}
.bar {{ height:30px; background:var(--zebra); border-bottom:1px solid var(--rule); display:flex; gap:7px; align-items:center; padding:0 12px; }}
.bar i {{ width:10px; height:10px; border-radius:50%; background:#d5dae3; }}
.frame img {{ display:block; width:100%; height:470px; object-fit:cover; object-position:top left; }}
.how {{ display:flex; flex-direction:column; gap:22px; }}
.tiles {{ grid-template-columns:repeat(3,1fr); margin-top:6px; }}
.tile .n {{ font-size:34px; }}
</style>
<div class="grid">
  <div class="frame"><div class="bar"><i></i><i></i><i></i></div><img src="{shot}" alt=""></div>
  <div class="how">{steps}
    <div class="tiles">
      <div class="tile key"><div class="n">7</div><div class="c">Draft rules</div></div>
      <div class="tile"><div class="n">6</div><div class="c">Views: board, pick, targets, fades, plan, method</div></div>
      <div class="tile"><div class="n">12</div><div class="c">Draft slots supported</div></div>
    </div>
  </div>
</div>""", 'The Two-Flex Board')
# ---------- 6. Copilot Studio agent guide: Meetings to Smartsheet ----------
flow = ['Gather', 'Extract', 'Route', 'Match', 'Change Set', 'Approve', 'Write + Verify', 'Log']
pipe = ''.join(f'<div class="p{" gate" if t == "Approve" else ""}"><b>{i:02d}</b>{t}</div>' for i, t in enumerate(flow, 1))
dest = [
    ('RAAIDD Log', 'Something to track or govern', 'Risks, actions, decisions, dependencies'),
    ('Project Plan', 'Would it show on the timeline?', 'New tasks, date changes, % complete'),
    ('Both', 'Changes the schedule and needs tracking', 'A slipped date, a decision that creates work'),
    ('OneNote', 'No clear home or low confidence', 'FYIs, email-only items, missing owner'),
]
rows = ''.join(f'<tr><td><span class="pill">{d}</span></td><td>{q}</td><td>{e}</td></tr>' for d, q, e in dest)
page('copilot-agent', 'Process Automation · Copilot Studio Guide',
     'Meetings to Smartsheet Agent',
     'A build guide for an agent that turns client meetings into approved RAAIDD log and project plan updates.',
     f"""<style>
.pipe {{ display:flex; gap:8px; margin-top:26px; }}
.p {{ flex:1; background:var(--accent-soft); border-radius:10px; padding:10px 12px; font:700 15.5px Manrope, sans-serif; white-space:nowrap; position:relative; }}
.p b {{ display:block; font:800 12px Manrope, sans-serif; color:var(--accent); letter-spacing:.1em; margin-bottom:2px; }}
.p.gate {{ background:var(--gold-soft); }} .p.gate b {{ color:var(--gold); }}
.grid {{ display:grid; grid-template-columns:1fr 470px; gap:40px; margin-top:24px; }}
table {{ width:100%; border-collapse:collapse; font-size:15.5px; }}
th {{ text-align:left; font:700 12.5px Manrope, sans-serif; letter-spacing:.14em; text-transform:uppercase; color:var(--muted); padding:0 10px 8px; border-bottom:2px solid var(--ink); }}
td {{ padding:11px 10px; border-bottom:1px solid var(--rule); vertical-align:middle; }}
tr:nth-child(even) td {{ background:var(--zebra); }}
td:nth-child(3) {{ color:var(--muted); }}
.pill {{ display:inline-block; font:700 14px Manrope, sans-serif; color:var(--accent); background:var(--accent-soft); padding:4px 12px; border-radius:999px; white-space:nowrap; }}
.right {{ display:flex; flex-direction:column; gap:14px; }}
.routes {{ display:grid; grid-template-columns:1fr 1fr; gap:14px; }}
.tile h4 {{ font:800 17px Manrope, sans-serif; margin-top:4px; }}
.tile p {{ font-size:14.5px; color:var(--muted); margin-top:4px; line-height:1.4; }}
.skills {{ display:flex; flex-wrap:wrap; gap:8px; margin-top:8px; }}
.skills span {{ font:600 13.5px Inter; background:rgba(255,255,255,.16); color:#fff; padding:5px 11px; border-radius:999px; }}
</style>
<div class="pipe">{pipe}</div>
<div class="grid">
  <div><table><tr><th>Destination</th><th>Test</th><th>Examples</th></tr>{rows}</table>
    <div class="callout" style="margin-top:22px"><div class="t">Also in the Guide</div><p>Jira sync roadmap, IT approval questions, and a companion agent that emails meeting minutes.</p></div></div>
  <div class="right">
    <div class="routes">
      <div class="tile"><span class="label">Route 1</span><h4>On Demand</h4><p>Send a meeting title or recap link, review the change set, reply “approved”.</p></div>
      <div class="tile"><span class="label">Route 2</span><h4>Daily Sweep</h4><p>Each weekday morning: the prior day’s meetings, skipping any that weren’t held.</p></div>
    </div>
    <div class="tile key"><div class="c" style="margin:0;font:700 12.5px Manrope;letter-spacing:.14em;text-transform:uppercase;color:#fff">4 Skills</div>
      <div class="skills"><span>meeting-intake</span><span>smartsheet-router</span><span>raaidd-log</span><span>project-plan</span></div></div>
  </div>
</div>""", 'Copilot Studio Agent Guide')
print('built')
