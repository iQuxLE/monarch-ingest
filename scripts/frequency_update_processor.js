function processAdd(cmd) {
    var doc = cmd.solrDoc;
    var frequency_qualifier = doc.getFieldValue("frequency_qualifier");
    var has_quotient = doc.getFieldValue("has_quotient");

    logger.info("Processing document: " + doc.getFieldValue("id"));

    if (has_quotient) {
        logger.info("has_quotient is a number: " + has_quotient + " and it will be copied to frequency_computed_sortable_float");
        doc.setField("frequency_computed_sortable_float", has_quotient);
    } else if (frequency_qualifier) {
        logger.info("frequency_qualifier is a string: " + frequency_qualifier + " and it will be mapped to a float and copied to frequency_computed_sortable_float");
        var floatValue = mapHpIdToFloat(frequency_qualifier);
        doc.setField("frequency_computed_sortable_float", floatValue);
    }

    return cmd;
}

function mapHpIdToFloat(frequency_qualifier) {
    // Mapping HP IDs to float values
    switch (frequency_qualifier) {
        case "HP:0040280":
            return 1.0;
        case "HP:0040281":
            return 0.8;
        case "HP:0040282":
            return 0.3;
        case "HP:0040283":
            return 0.05;
        case "HP:0040284":
            return 0.01;
        default:
            return 0.0; // Default value if HP ID not found
    }
}

function finish() {
    logger.info("Finished processing");
}

function processCommit() {
    logger.info("process commit");
}