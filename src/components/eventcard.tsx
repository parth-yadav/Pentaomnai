import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Skeleton } from "@nextui-org/skeleton";
import dayjs from "dayjs";
import { Calendar, Clock, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { type Event } from "@/constants/events";

interface BaseEventCardProps {
    className?: string;
    clickCallback?: () => void;
    locationOnTop?: boolean;
    showDescription?: boolean;
    isPressable?: boolean;
    showRegisterButton?: boolean;
    truncateDescription?: boolean;
}

// When loading is provided, event is optional
interface LoadingProps extends BaseEventCardProps {
    loading: true;
    event?: Event; // Optional when loading is true
}

// When loading is not provided, event is required
interface EventProps extends BaseEventCardProps {
    loading?: false; // loading is optional and false by default
    event: Event; // Required when loading is false
}

// Combined type
type EventCardProps = LoadingProps | EventProps;

const EventCard: React.FC<EventCardProps> = ({
    // description,
    className,
    loading,
    event,
    clickCallback,
    locationOnTop = true,
    showDescription,
    isPressable = false,
    showRegisterButton = true,
    truncateDescription = false,
}) => {
    const RegisterButton: React.FC<{ className?: string }> = ({ className }) => (
        <div
            className={`${className} flex cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white`}
            color='primary'
        >
            View
        </div>
    );

    const DetailsWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <div className={`flex items-center space-x-2 text-xs ${showDescription ? "ml-2" : ""}`}>
            {children}
        </div>
    );

    return (
        <div className={`relative flex h-full flex-col ${className}`}>
            {loading ? (
                <Card
                    // isFooterBlurred
                    className={`col-span-12 h-[300px] w-full sm:col-span-5 ${className}`}
                >
                    <Skeleton className='h-full w-full' />
                </Card>
            ) : (
                <Card
                    isPressable={isPressable}
                    onPress={() => clickCallback && clickCallback()}
                    // isFooterBlurred
                    className={`col-span-12 h-[300px] w-full sm:col-span-5 ${className}`}
                >
                    <CardHeader className='absolute top-1 z-20 flex-col items-start'>
                        {locationOnTop && (
                            <div className='text-tiny font-bold text-white/60'>
                                <Badge variant='default' className='bg-gray-700/70 p-2'>
                                    <p className='flex items-center gap-1 space-x-2'>
                                        <MapPin size={16} />
                                        {event.location}
                                    </p>
                                </Badge>
                            </div>
                        )}
                        <h4 className='text-left text-2xl font-medium text-white'>{event.name}</h4>
                    </CardHeader>
                    <div className='relative h-full w-full'>
                        <div
                            className='absolute inset-0 z-0 bg-cover bg-center'
                            style={{
                                opacity: 0.8,
                                backgroundImage: `url(${event.imageSrc})`,
                                backgroundSize: "cover",
                            }}
                        />
                        <div
                            className={
                                "absolute inset-0 z-10 bg-black opacity-35 transition-opacity duration-300 hover:opacity-55"
                            }
                        />
                    </div>
                    <CardFooter className='absolute bottom-0 z-20 justify-between border-t-1 border-zinc-100/50 bg-white text-black'>
                        <div className={"flex flex-col space-y-2"}>
                            {showDescription && (
                                <div className='text-md'>
                                    <div className={"flex flex-col items-center gap-2"}>
                                        <span>
                                            {truncateDescription
                                                ? event.description.slice(0, 86) + "..."
                                                : event.description}
                                        </span>
                                    </div>
                                    <Divider className='my-3' />
                                </div>
                            )}
                            <div className='flex flex-row justify-between'>
                                <div className={"space-y-2"}>
                                    {!locationOnTop && (
                                        <DetailsWrapper>
                                            <p className='flex items-center space-x-2'>
                                                <MapPin size={16} />
                                                <span>{event.location}</span>
                                            </p>
                                        </DetailsWrapper>
                                    )}
                                    <DetailsWrapper>
                                        <Calendar className='h-4 w-4' />
                                        <span>
                                            {dayjs(event.startDateTime).format("MMM D, YYYY")}
                                        </span>
                                        {/* display this only if endDateTime.date is different from startDateTime.date */}
                                        {dayjs(event.startDateTime).format("MMM D, YYYY") !==
                                            dayjs(event.endDateTime).format("MMM D, YYYY") && (
                                            <span>
                                                - {dayjs(event.endDateTime).format("MMM D, YYYY")}
                                            </span>
                                        )}
                                    </DetailsWrapper>
                                    <DetailsWrapper>
                                        <Clock className='h-4 w-4' />
                                        <span>{dayjs(event.startDateTime).format("h:mm A")}</span>
                                        {dayjs(event.startDateTime).format("h:mm A") !==
                                            dayjs(event.endDateTime).format("h:mm A") && (
                                            <span>
                                                - {dayjs(event.endDateTime).format("h:mm A")}
                                            </span>
                                        )}
                                    </DetailsWrapper>
                                </div>
                                <div className=''>
                                    <DetailsWrapper>
                                        {showRegisterButton && <RegisterButton />}
                                    </DetailsWrapper>
                                </div>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
};

export default EventCard;
