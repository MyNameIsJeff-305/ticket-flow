/* eslint-disable react/no-unescaped-entities */
import {
    Document,
    Page,
    Image,
    Text,
    View,
    StyleSheet,
    Font
} from '@react-pdf/renderer';

// Custom font
Font.register({
    family: 'Helvetica-Bold',
    fonts: [
        {
            src: 'https://fonts.gstatic.com/s/helveticaneue/v14/YkM2Z0-ZY1e_wjl2uD7DLhlHkXKqQlPDPs1TW7lplhE.ttf',
        },
    ],
});

const backgroundImage = 'https://win11comptool.s3.us-east-1.amazonaws.com/watermark-pdf.jpg';

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 10,
        fontFamily: 'Helvetica',
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'fill',
        bottom: 0,
        right: 0,
        zIndex: -1
    },
    header: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    reportTitle: {
        fontSize: 18,
        paddingTop: 150,
        fontFamily: 'Helvetica-Bold',
        textTransform: 'uppercase',
    },
    statusBadge: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Helvetica-Bold',
    },
    statusOpen: { backgroundColor: '#FF6B6B' },
    statusInProgress: { backgroundColor: '#FFD93D', color: '#000' },
    statusClosed: { backgroundColor: '#4CAF50' },

    section: {
        marginBottom: 15,
        padding: 10,
        border: '1pt solid #ddd',
        borderRadius: 6,
        backgroundColor: '#f8f8f8',
    },
    sectionTitle: {
        fontSize: 12,
        fontFamily: 'Helvetica-Bold',
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    label: {
        fontFamily: 'Helvetica-Bold',
        width: 100,
    },
    value: {
        flex: 1,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginBottom: 6,
    },
    paragraph: {
        fontSize: 10,
        lineHeight: 1.5,
        textAlign: 'justify',
    },
});

export default function TrackingReport({ ticket }) {
    const statusName = ticket.StatusInfo?.name;
    let statusStyle = styles.statusClosed;
    if (statusName === 'Open') statusStyle = styles.statusOpen;
    if (statusName === 'In Progress') statusStyle = styles.statusInProgress;

    let statusExplanation = '';
    if (statusName === 'Open') {
        statusExplanation =
            'The ticket was created and is pending assignment to an agent.';
    } else if (statusName === 'In Progress') {
        statusExplanation = 'An agent is actively working on this ticket.';
    } else if (statusName === 'Closed') {
        statusExplanation = 'The ticket has been resolved and closed.';
    }

    return (
        <Document>
            <Page size="LETTER" style={styles.page}>
                {/* Background */}
                <Image style={styles.backgroundImage} src={backgroundImage} />

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.reportTitle}>Ticket Status Report</Text>
                    <Text style={{ ...styles.statusBadge, ...statusStyle }}>
                        {statusName}
                    </Text>
                </View>

                {/* Ticket Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Ticket Information</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>ID:</Text>
                        <Text style={styles.value}>{ticket.id}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Title:</Text>
                        <Text style={styles.value}>{ticket.title}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Created:</Text>
                        <Text style={styles.value}>
                            {new Date(ticket.createdAt).toLocaleString()}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Last Update:</Text>
                        <Text style={styles.value}>
                            {new Date(ticket.updatedAt).toLocaleString()}
                        </Text>
                    </View>
                    <View style={[styles.row, { flexDirection: 'column' }]}>
                        <Text style={[styles.label, { marginBottom: 4 }]}>Description:</Text>
                        <Text style={styles.paragraph}>{ticket.description}</Text>
                    </View>
                </View>

                {/* Client Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Client Information</Text>
                    <Text style={styles.row}>
                        Client Name: {ticket.ClientInfo?.firstName ? `${ticket.ClientInfo?.firstName} ${ticket.ClientInfo?.lastName}` : ticket.ClientInfo?.CompanyName}
                    </Text>
                    <Text style={styles.row}> Email: {ticket.ClientInfo?.email ? ticket.ClientInfo?.email : 'N/A'}</Text>
                    <Text style={styles.row}> Phone: {ticket.ClientInfo?.phoneNumber ? ticket.ClientInfo?.phoneNumber : 'N/A'}</Text>
                </View>

                {/* Status Overview */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Status Overview</Text>
                    <Text style={styles.paragraph}>{statusExplanation}</Text>
                </View>
            </Page>
        </Document>
    );
}
