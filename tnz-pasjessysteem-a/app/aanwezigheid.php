<?php
session_start();
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    header('Location: index.php?mode=login');
    exit;
}

$userName = $_SESSION['user_name'] ?? 'Gebruiker';
$userRole = $_SESSION['user_role'] ?? 'Docent IT';
$active = 'aanwezigheid';
?>
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aanwezigheid | StudentAanwezigheid</title>
    <link rel="stylesheet" href="assets/css/dashboard.css">
</head>
<body>
    <header class="topbar">
        <div class="search" aria-label="Zoeken">
            <span>⌕</span>
            <input type="text" value="Zoeken in Scalda..." aria-label="Zoeken in Scalda" />
        </div>

        <div class="topbar-right">
            <div class="icon-btn" aria-label="Informatie">?</div>
            <div class="icon-btn" aria-label="Notificaties">◔</div>
            <div class="user-pill">
                <div class="avatar"><?= strtoupper(substr($userName, 0, 1)); ?></div>
                <div class="user-meta">
                    <div class="user-name"><?= htmlspecialchars($userName); ?></div>
                    <div class="user-role"><?= htmlspecialchars($userRole); ?></div>
                </div>
            </div>
        </div>
    </header>

    <main class="content">
        <section class="header-card">
            <div>
                <h1>Aanwezigheid</h1>
                <div class="date"><span class="date-mark">◫</span><span>Vandaag • 24 Oktober</span></div>
            </div>
            <div class="header-actions">
                <a class="action-btn" href="dashboard.php">Dashboard</a>
                <a class="action-btn" href="index.php?logout=1">Uitloggen</a>
            </div>
        </section>

        <section class="main-grid">
            <div class="panel">
                <div class="panel-header">
                    <div class="panel-title"><span>Studenten aanwezig</span></div>
                    <span class="status-live">Live</span>
                </div>
                <div class="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Groep</th>
                                <th>Check-in</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><div class="student-cell"><div class="student-initials">BD</div><div>Bram van Dijk</div></div></td>
                                <td>IT-2A</td>
                                <td>08:14</td>
                                <td><span class="status-pill green">Aanwezig</span></td>
                            </tr>
                            <tr>
                                <td><div class="student-cell"><div class="student-initials">SG</div><div>Sophie de Groot</div></div></td>
                                <td>IT-1B</td>
                                <td>08:42</td>
                                <td><span class="status-pill orange">Te Laat</span></td>
                            </tr>
                            <tr>
                                <td><div class="student-cell"><div class="student-initials">LM</div><div>Lars Mulder</div></div></td>
                                <td>IT-2A</td>
                                <td>--:--</td>
                                <td><span class="status-pill red">Afwezig</span></td>
                            </tr>
                            <tr>
                                <td><div class="student-cell"><div class="student-initials">DJ</div><div>Daan Jansen</div></div></td>
                                <td>IT-3A</td>
                                <td>--:--</td>
                                <td><span class="status-pill gray">Niet ingecheckt</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <aside class="side-col">
                <div class="panel">
                    <div class="panel-header"><div class="panel-title"><span>Snelle nav</span></div></div>
                    <div class="quick-actions">
                        <a class="quick-btn <?= $active === 'dashboard' ? 'primary' : '' ?>" href="dashboard.php">Dashboard</a>
                        <a class="quick-btn <?= $active === 'agenda' ? 'primary' : '' ?>" href="agenda.php">Agenda</a>
                        <a class="quick-btn <?= $active === 'klassen' ? 'primary' : '' ?>" href="klassen.php">Klassen</a>
                        <a class="quick-btn <?= $active === 'studenten' ? 'primary' : '' ?>" href="studenten.php">Studenten</a>
                        <a class="quick-btn <?= $active === 'scan' ? 'primary' : '' ?>" href="scan.php">Scan</a>
                        <a class="quick-btn <?= $active === 'verlof' ? 'primary' : '' ?>" href="verlof.php">Verlof</a>
                    </div>
                </div>
            </aside>
        </section>
    </main>
</body>
</html>
