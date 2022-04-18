export function labelsCriticalities(type) {
    var label = "";

    switch (type) {
        case 3:
            label = "Alta";
            break;
        case 2:
            label = "Média";
            break;
        case 1:
            label = "Baixa";
            break;
    }

    return label;
}

export function labelsCriticalitiesColor(type) {
    var label = "";

    switch (type) {
        case 3:
            label = "red";
            break;
        case 2:
            label = "#e67e22";
            break;
        case 1:
            label = "#9f9f9f";
            break;
    }

    return label;
}

export function labelsTypes(type) {
    var label = "";

    switch (type) {
        case 2:
            label = "Incidente";
            break;
        case 1:
            label = "Alarme";
            break;
    }

    return label;
}

export function labelStatus(type) {
    var label = "";

    switch (type) {
        case 1:
            label = "Ativo";
            break;
        case 0:
            label = "Inativo";
            break;
    }

    return label;
}